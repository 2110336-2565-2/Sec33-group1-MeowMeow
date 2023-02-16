import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/CreateReview.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(
    @Inject('ReviewService') private readonly reviewService: ReviewService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  addReview(@Body() reviewData: CreateReviewDto) {
    this.reviewService.createReview(reviewData);
    return 'Review added';
  }
}
