import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SearchGuidesRequest } from './dto/searchGuide';
import { GuideService } from './guide.service';

@Controller('guides')
export class GuidesController {
  constructor(
    @Inject('GuideService') private readonly guidesService: GuideService,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe())
  async findGuides(
    @Body() reqBody: SearchGuidesRequest,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const resBody = await this.guidesService.searchGuides(reqBody);
      res.status(HttpStatus.OK).send(resBody);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
