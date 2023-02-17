import { Injectable } from '@nestjs/common';
import { Guide } from 'database';

import {
  SearchGuidesRequest,
  SearchGuidesResponse,
} from 'src/guide/dto/searchGuide';
import { GuideRepository } from './guide.repository';

export interface GuideService {
  searchGuides(searchInfo: SearchGuidesRequest): Promise<SearchGuidesResponse>;
}

@Injectable()
export class GuideServiceImpl {
  constructor(private readonly guideRepo: GuideRepository) {}

  async searchGuides(req: SearchGuidesRequest): Promise<SearchGuidesResponse> {
    const guides = await this.guideRepo.paginateGuides(req);
    return { results: guides };
  }
}
