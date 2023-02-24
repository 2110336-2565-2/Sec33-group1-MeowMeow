import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SearchGuidesRequest, SearchGuidesResponse } from './dtos/searchGuide';
import { GuidesService } from './guides.service';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { off } from 'process';
import { IsEmail } from 'class-validator';

@Controller('guides')
export class GuidesController {
  constructor(
    @Inject('GuidesService') private readonly guidesService: GuidesService,
  ) {}

  @ApiCookieAuth('access_token')
  @ApiOperation({
    summary: 'paginate guides with filter',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully paginated guides',
    type: SearchGuidesResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'access token not provided',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @Get()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async searchGuides(
    @Query() queryParams: SearchGuidesRequest,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const resBody = await this.guidesService.searchGuides(queryParams);
      res.status(HttpStatus.OK).send(resBody);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getGuideById(@Query('id') id: number) {
    // TODO: Implement this
  }

  @Get(':id/reviews/:page')
  async getGuideReviews(@Query('id') id: number, @Query('page') page: number) {
    // TODO: Implement this
  }
}
