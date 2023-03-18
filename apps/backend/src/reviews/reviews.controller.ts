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
import { AccountMetadata, CreateReviewRequest } from 'types';
import { ReviewsService } from './reviews.service';
import { InvalidRequestError } from 'src/auth/auth.commons';
import { FailedRelationConstraintError } from './reviews.common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(
    @Inject('ReviewsService') private readonly reviewsService: ReviewsService,
  ) {}

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
