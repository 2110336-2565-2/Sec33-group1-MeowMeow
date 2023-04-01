import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Role } from 'database';
import { PaymentService } from 'src/payment/payment.service';
import { UsersRepository } from 'src/users/users.repository';
import {
  GetGuideByIdResponse,
  GetGuideByUserIdResponse,
  GuideRegisterRequest,
  GuideRegisterResponse,
  SearchGuidesRequest,
  SearchGuidesResponse,
} from 'types';
import { InvalidRequestError } from '../auth/auth.commons';
import { MediaService } from '../media/media.service';
import { GuidesRepository } from './guides.repository';

export interface GuidesService {
  searchGuides(searchInfo: SearchGuidesRequest): Promise<SearchGuidesResponse>;
  getGuideById(id: number): Promise<GetGuideByIdResponse>;
  getGuideByUserId(userId: number): Promise<GetGuideByUserIdResponse>;
  registerUserForGuide(
    userId: number,
    guideRegisterData: GuideRegisterRequest,
  ): Promise<GuideRegisterResponse>;
}

@Injectable()
export class GuidesServiceImpl {
  constructor(
    private readonly guidesRepo: GuidesRepository,
    private readonly usersRepo: UsersRepository,
    private readonly paymentService: PaymentService,
    @Inject('MediaService') private readonly mediaService: MediaService,
  ) {}

  async searchGuides(req: SearchGuidesRequest): Promise<SearchGuidesResponse> {
    const err = await validate(req, { skipMissingProperties: true });
    if (err.length > 0) {
      throw new InvalidRequestError(err.toString());
    }

    return await this.guidesRepo.paginateGuides(req);
  }

  async getGuideById(id: number): Promise<GetGuideByIdResponse> {
    return await this.guidesRepo.getGuide({ id: id });
  }

  async getGuideByUserId(userId: number): Promise<GetGuideByUserIdResponse> {
    const guide: GetGuideByIdResponse = await this.guidesRepo.getGuide({
      userId: userId,
    });
    const user = await this.usersRepo.getUserById(userId);
    return {
      ...guide,
      email: user.email,
      username: user.username,
      roles: user.roles,
    };
  }

  async registerUserForGuide(
    userId: number,
    guideRegisterData: GuideRegisterRequest,
  ): Promise<GuideRegisterResponse> {
    const uploadResponse = await this.mediaService.upload({
      file: guideRegisterData.certificate,
    });

    const paymentId = await this.paymentService.createRecipient({
      userId: userId,
      brandBankAccount: guideRegisterData.brandBankAccount,
      nameBankAccount: guideRegisterData.nameBankAccount,
      numberBankAccount: guideRegisterData.numberBankAccount,
    });

    const certFileId = uploadResponse.id;
    const guide = await this.guidesRepo.registerUserForGuide({
      userId: userId,
      certificateId: certFileId,
      paymentId: paymentId,
      brandBankAccount: guideRegisterData.brandBankAccount,
      nameBankAccount: guideRegisterData.nameBankAccount,
      numberBankAccount: guideRegisterData.numberBankAccount,
      locations: guideRegisterData.locations,
      tourStyles: guideRegisterData.tourStyles,
    });
    this.usersRepo.addUserRole(userId, Role.GUIDE);
    return {
      message: 'success',
      guideId: guide.guideId,
      certificateId: guide.certificateId,
    };
  }
}
