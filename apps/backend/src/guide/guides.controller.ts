import {
  Controller,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GuideSearchDto } from './guideSearch.dto';
import { GuidesService } from './guides.service';

@Controller('guides')
export class GuidesController {
  constructor(private guidesService: GuidesService) {}
  @Get()
  @UsePipes(new ValidationPipe())
  findGuides(@Body() searchDetails: GuideSearchDto) {
    // console.log(searchDetails);
    return this.guidesService.getGuides(searchDetails);
  }
}
