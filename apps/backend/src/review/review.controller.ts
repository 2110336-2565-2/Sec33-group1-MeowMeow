import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dtos/CreateReview.dto';
import { ReviewService } from './service/review/review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  addReview(@Body() reviewData: CreateReviewDto) {
    this.reviewService.createReview(reviewData);
    return 'Review added';
  }
}
