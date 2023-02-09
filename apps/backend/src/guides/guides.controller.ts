import {
  Controller,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GuideSearch } from './dtos/guideSearch.dto';

@Controller('guides')
export class GuidesController {
  @Get('')
  @UsePipes(new ValidationPipe())
  findGuides(@Body() searchDetails: GuideSearch) {
    if (
      searchDetails.reviewScore == 10 &&
      searchDetails.fee.gte == 500 &&
      searchDetails.fee.lte == 2000
    ) {
      return {
        first_name: 'Nattee',
        last_name: 'Niparnan',
        phone_number: '0819696969',
        picture: 'pfp/divideandconquer.png',
        gender: 'M',
        age: 420,
      };
    }
    // searchDetails.fee = Math.round(searchDetails.fee*100)/100
    // searchDetails.reviewScore = Math.round(searchDetails.reviewScore*100)/100
  }
}
