import { Injectable } from '@nestjs/common';
import {
  CreateReviewRequest,
  CreateReviewResponse,
  GetGuideReviewsRequest,
  GetGuideReviewsResponse,
} from 'types';
import { InvalidRequestError } from 'src/auth/auth.commons';
import { ReviewsRepository } from './reviews.repository';
import { validate } from 'class-validator';

export interface ReviewsService {
  createReview(req: CreateReviewRequest);
  getGuideReviews(
    req: GetGuideReviewsRequest,
  ): Promise<GetGuideReviewsResponse>;
}

@Injectable()
export class ReviewsServiceImpl {
  constructor(private readonly reviewsRepo: ReviewsRepository) {}

  async createReview(req: CreateReviewRequest): Promise<CreateReviewResponse> {
    if (!Number.isInteger(req.score) || (req.score % 1).toFixed(1) !== '0.5') {
      throw new InvalidRequestError('review score must ends with .5');
    }

    const review = await this.reviewsRepo.createReview({
      publishDate: new Date(),
      reviewerId: req.reviewerId,
      guideId: req.guideId,
      score: req.score,
      text: req.text,
    });

    return {
      message: 'success',
      id: review.id,
      guideId: review.guideId,
      reviewerId: review.reviewerId,
      score: review.score.toNumber(),
      text: review.text,
    };
  }

  async getGuideReviews(
    req: GetGuideReviewsRequest,
  ): Promise<GetGuideReviewsResponse> {
    const err = await validate(req);
    if (err.length > 0) {
      throw new InvalidRequestError(err.toString());
    }
    const guideReviews = await this.reviewsRepo.getGuideReviews(req);
    return { reviews: guideReviews };
  }
}
