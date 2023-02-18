import { Injectable } from '@nestjs/common';
import { Guide } from 'database';

import { SearchGuidesRequest, SearchGuidesResponse } from './dtos/searchGuide';
import { GuidesRepository } from './guides.repository';

export interface GuidesService {
  searchGuides(searchInfo: SearchGuidesRequest): Promise<SearchGuidesResponse>;
}

@Injectable()
export class GuidesServiceImpl {
  constructor(private readonly guidesRepo: GuidesRepository) {}

  async searchGuides(req: SearchGuidesRequest): Promise<SearchGuidesResponse> {
    const guides = await this.guidesRepo.paginateGuides(req);
    return { results: guides };
  }
}
