import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  AccountMetadata,
  CreateReviewRequest,
  CreateReviewResponse,
} from 'types';
import { ReviewsService } from './reviews.service';
import { InvalidRequestError } from '../auth/auth.commons';
import { FailedRelationConstraintError } from './reviews.common';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(
    @Inject('ReviewsService') private readonly reviewsService: ReviewsService,
  ) {}

  @ApiCookieAuth('access_token')
  @ApiOperation({
    summary: 'decline booking by ID',
  })
  @ApiBody({
    type: CreateReviewRequest,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully created new booking',
    type: CreateReviewResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'some required information is absent or invalid',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async addReview(
    @Req() req,
    @Body() reqBody: CreateReviewRequest,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const account: AccountMetadata = req.account;
      reqBody.reviewerId = account.userId;
      const resBody = await this.reviewsService.createReview(reqBody);
      res.status(HttpStatus.CREATED).send(resBody);
    } catch (e) {
      console.log(e);
      if (e instanceof InvalidRequestError) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      }
      if (e instanceof FailedRelationConstraintError) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
