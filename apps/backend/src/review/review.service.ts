import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateReviewRequest,
  CreateReviewResponse,
} from './dto/CreateReview.dto';
import { InvalidRequestError } from 'src/auth/auth.commons';

export interface ReviewService {
  createReview(req: CreateReviewRequest);
}

@Injectable()
export class ReviewServiceImpl {
  constructor(private prisma: PrismaService) {}

  async createReview(req: CreateReviewRequest): Promise<CreateReviewResponse> {
    if ((req.score % 1).toFixed(1) !== '0.5') {
      throw new InvalidRequestError('review score must ends with .5');
    }

    const review = await this.prisma.review.create({
      data: {
        publishDate: new Date(),
        score: req.score,
        text: req.text,
        reviewerId: 20,
        guideId: req.guideId,
      },
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
