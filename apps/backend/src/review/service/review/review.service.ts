import { Injectable } from '@nestjs/common';
import { createReviewType } from 'src/review/utils/types';

@Injectable()
export class ReviewService {
  private demo_review = [];
  createReview(reviewData: createReviewType) {
    this.demo_review.push(reviewData);

    console.log('Pushed Data');
    console.log(reviewData);
    return {};
  }
}
