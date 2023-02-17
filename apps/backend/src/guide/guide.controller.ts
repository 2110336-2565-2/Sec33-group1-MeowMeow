import {
  Controller,
  Get,
  Body,
  Inject,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GuideSearchDto } from './dto/guideSearch.dto';
import { GuideService } from './guide.service';

@Controller('guides')
export class GuidesController {
  constructor(
    @Inject('GuideService') private readonly guidesService: GuideService,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe())
  findGuides(@Body() searchDetails: GuideSearchDto) {
    return this.guidesService.getGuides(searchDetails);
  }
}
