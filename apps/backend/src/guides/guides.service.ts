import { Injectable } from '@nestjs/common';
import { SearchGuidesRequest, SearchGuidesResponse } from 'types';
import { GuidesRepository } from './guides.repository';
import { validate } from 'class-validator';
import { InvalidRequestError } from 'src/auth/auth.commons';

export interface GuidesService {
  searchGuides(searchInfo: SearchGuidesRequest): Promise<SearchGuidesResponse>;
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
}
