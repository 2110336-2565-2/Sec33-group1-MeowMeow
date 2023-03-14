import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  GetGuideByIdRequest,
  GetGuideReviewsRequest,
  SearchGuidesRequest,
  SearchGuidesResponse,
} from 'types';
import { GuidesService } from './guides.service';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ReviewsService } from 'src/reviews/reviews.service';

@Controller('guides')
export class GuidesController {
  constructor(
    @Inject('GuidesService') private readonly guidesService: GuidesService,
    @Inject('ReviewsService') private readonly reviewsService: ReviewsService,
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
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async getGuideById(
    @Param() queryParams: GetGuideByIdRequest,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const resBody = await this.guidesService.getGuideById(queryParams);
      if (!resBody) {
        throw new NotFoundException(
          `Guide with id ${queryParams.id} does not exist.`,
        );
      }
      res.status(HttpStatus.OK).send(resBody);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @Get(':id/reviews/:page')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async getGuideReviews(
    @Param() queryParams: GetGuideReviewsRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const reviews = await this.reviewsService.getGuideReviews(queryParams);
      res.status(HttpStatus.OK).send(reviews);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
