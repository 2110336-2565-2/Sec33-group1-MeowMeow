import { Injectable } from '@nestjs/common';
import { Guide } from 'database';

import { SearchGuidesRequest, SearchGuidesResponse } from './dtos/searchGuide';
import { GuideRepository } from './guides.repository';

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
