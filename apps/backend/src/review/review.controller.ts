import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewRequest } from './dto/CreateReview.dto';
import { ReviewService } from './review.service';
import { InvalidRequestError } from 'src/auth/auth.commons';
import { FailedRelationConstraintError } from './review.common';

@Controller('review')
export class ReviewController {
  constructor(
    @Inject('ReviewService') private readonly reviewService: ReviewService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async addReview(
    @Body() reqBody: CreateReviewRequest,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const resBody = await this.reviewService.createReview(reqBody);
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
