import { Injectable } from '@nestjs/common';
import {
  GetGuideReviewsRequest,
  GetGuideReviewsResponse,
  SearchGuidesRequest,
  SearchGuidesResponse,
} from 'types';
import { GuidesRepository } from './guides.repository';
import { validate } from 'class-validator';
import { InvalidRequestError } from 'src/auth/auth.commons';
import { GetGuideByIdRequest, GetGuideByIdResponse } from 'types';

export interface GuidesService {
  searchGuides(searchInfo: SearchGuidesRequest): Promise<SearchGuidesResponse>;
  getGuideById(id: GetGuideByIdRequest): Promise<GetGuideByIdResponse>;
}

@Injectable()
export class GuidesServiceImpl {
  constructor(private readonly guidesRepo: GuidesRepository) {}

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
}
