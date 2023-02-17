import {
  Controller,
  Get,
  Body,
  Inject,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GuideSearchRequest } from './dto/guideSearch.dto';
import { GuideService } from './guide.service';

@Controller('guides')
export class GuidesController {
  constructor(
    @Inject('GuideService') private readonly guidesService: GuideService,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe())
  findGuides(@Body() searchDetails: GuideSearchRequest) {
    return this.guidesService.getGuides(searchDetails);
  }
}
