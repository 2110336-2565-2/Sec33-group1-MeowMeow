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
      searchDetails.fee == 2000 &&
      searchDetails.datetime === new Date('2023-03-14') &&
      searchDetails.location == 'Berlint, Ostania'
    ) {
      return [
        {
          first_name: 'Nattee',
          last_name: 'Niparnan',
          phone_number: '0819696969',
          picture: 'pfp/divideandconquer.png',
          gender: 'M',
          age: 420,
        },
        {
          first_name: 'Jolyne',
          last_name: 'Kujo',
          phone_number: '0420420420',
          picture: 'pfp/stoneocean.png',
          gender: 'F',
          age: 1,
        },
      ];
    }
  }
}
