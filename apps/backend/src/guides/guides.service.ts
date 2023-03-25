import { Inject, Injectable } from '@nestjs/common';
import {
  GuideRegisterRequest,
  GuideRegisterResponse,
  SearchGuidesRequest,
  SearchGuidesResponse,
} from 'types';
import { GuidesRepository } from './guides.repository';
import { validate } from 'class-validator';
import { InvalidRequestError } from '../auth/auth.commons';
import { GetGuideByIdRequest, GetGuideByIdResponse } from 'types';
import { MediaService } from '../media/media.service';

export interface GuidesService {
  searchGuides(searchInfo: SearchGuidesRequest): Promise<SearchGuidesResponse>;
  getGuideById(id: GetGuideByIdRequest): Promise<GetGuideByIdResponse>;
  registerUserForGuide(
    userId: number,
    guideRegisterData: GuideRegisterRequest,
  ): Promise<GuideRegisterResponse>;
}

@Injectable()
export class GuidesServiceImpl {
  constructor(
    private readonly guidesRepo: GuidesRepository,
    @Inject('MediaService') private readonly mediaService: MediaService,
  ) {}

  async searchGuides(req: SearchGuidesRequest): Promise<SearchGuidesResponse> {
    const err = await validate(req, { skipMissingProperties: true });
    if (err.length > 0) {
      throw new InvalidRequestError(err.toString());
    }

    const guides = await this.guidesRepo.paginateGuides(req);
    return { results: guides };
  }

  async getGuideById(req: GetGuideByIdRequest): Promise<GetGuideByIdResponse> {
    const err = await validate(req);
    if (err.length > 0) {
      throw new InvalidRequestError(err.toString());
    }
    const guideResult = await this.guidesRepo.getGuideById(req.id);
    return guideResult;
  }

  async registerUserForGuide(
    userId: number,
    guideRegisterData: GuideRegisterRequest,
  ): Promise<GuideRegisterResponse> {
    const uploadResponse = await this.mediaService.upload({
      file: guideRegisterData.certificate,
    });
    const certFileId = uploadResponse.id;
    const guide = await this.guidesRepo.registerUserForGuide({
      userId: userId,
      certificate: certFileId,
    });
    return {
      message: 'success',
      guideId: guide.guideId,
      certificateId: guide.certificate,
    };
  }
}
