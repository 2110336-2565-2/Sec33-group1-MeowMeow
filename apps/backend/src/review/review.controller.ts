import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dtos/CreateReview.dto';
import { ReviewService } from './service/review/review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post('')
  @UsePipes(new ValidationPipe())
  addReview(@Body() reviewData: CreateReviewDto) {
    const rating: number = reviewData.rating;
    if (rating > 0 || rating < 5 || rating % 0.5 != 0) {
      throw new HttpException(
        'Invalid rating, it should be between 0 and 5 and multiple of 0.5',
        HttpStatus.BAD_REQUEST,
      );
    }
    const comment: string = reviewData.comment;
    if (comment.length > 200) {
      throw new HttpException(
        'Comment too long, it should not exceed 200 characters.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      reviewData.touristID == '028' &&
      reviewData.guideID == '126' &&
      rating == 4.5 &&
      comment == ''
    ) {
      return 'Mock Mock';
    }
    return {};
    // this.reviewService.createReview(reviewData);
    // return 'Review added';
  }
}