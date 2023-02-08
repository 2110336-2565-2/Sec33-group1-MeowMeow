import { Body, Controller, Post } from '@nestjs/common';
import { CreateReviewDto } from './dtos/CreateReview.dto';

@Controller('review')
export class ReviewsController {
  @Post('')
  addReview(@Body() reviewData: CreateReviewDto) {
    console.log(reviewData);
    return {};
  }
}
