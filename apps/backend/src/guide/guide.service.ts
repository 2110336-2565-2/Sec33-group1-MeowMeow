import { Injectable } from '@nestjs/common';
import { Guide } from 'database';

import {
  GuideSearchRequest,
  GuideSearchResponse,
} from 'src/guide/dto/guideSearch.dto';
import { GuideRepository } from './guide.repository';

export interface GuideService {
  getAllGuides(): Promise<Guide[]>;
  getGuides(searchInfo: GuideSearchRequest): Promise<Guide[]>;
}

@Injectable()
export class GuideServiceImpl {
  constructor(private readonly guideRepo: GuideRepository) {}

  async getGuides(req: GuideSearchRequest): Promise<GuideSearchResponse> {
    const guides = await this.guideRepo.paginateGuides(req);
    return { results: guides };
  }
}
