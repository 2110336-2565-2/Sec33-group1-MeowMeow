import { Injectable } from '@nestjs/common';
import {
  CreateReviewRequest,
  CreateReviewResponse,
  GetGuideReviewsResponse,
} from 'types';
import { InvalidRequestError } from '../auth/auth.commons';
import { ReviewsRepository } from './reviews.repository';

export interface ReviewsService {
  createReview(userId: number, req: CreateReviewRequest);
  getGuideReviews(id: number, page: number): Promise<GetGuideReviewsResponse>;
}

@Injectable()
export class ReviewsServiceImpl {
  constructor(private readonly reviewsRepo: ReviewsRepository) {}

  async createReview(
    userId: number,
    req: CreateReviewRequest,
  ): Promise<CreateReviewResponse> {
    if (!Number.isInteger(req.score) && (req.score % 1).toFixed(1) !== '0.5') {
      throw new InvalidRequestError('review score must be divisible with .5');
    }
    const review = await this.reviewsRepo.createReview(userId, {
      guideId: req.guideId,
      score: req.score,
      text: req.text,
    });

    return {
      message: 'success',
      publishDate: review.publishDate,
      id: review.id,
      guideId: review.guideId,
      reviewerId: review.reviewerId,
      score: review.score.toNumber(),
      text: review.text,
    };
  }

  async getGuideReviews(
    id: number,
    page: number,
  ): Promise<GetGuideReviewsResponse> {
    return await this.reviewsRepo.getGuideReviews(id, page);
  }
}
