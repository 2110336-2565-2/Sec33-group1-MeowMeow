import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateReviewRequest,
  CreateReviewResponse,
} from './dto/CreateReview.dto';
import { InvalidRequestError } from 'src/auth/auth.commons';
import { ReviewRepository } from './review.repository';

export interface ReviewService {
  createReview(req: CreateReviewRequest);
}

@Injectable()
export class ReviewServiceImpl {
  constructor(private readonly reviewRepo: ReviewRepository) {}

  async createReview(req: CreateReviewRequest): Promise<CreateReviewResponse> {
    if ((req.score % 1).toFixed(1) !== '0.5') {
      throw new InvalidRequestError('review score must ends with .5');
    }

    const review = await this.reviewRepo.createReview({
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
}
