import { Injectable } from '@nestjs/common';
import { Prisma, Review } from 'database';
import { PrismaService } from 'src/prisma/prisma.service';
import { FailedRelationConstraintError } from './reviews.common';

@Injectable()
export class ReviewRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createReview(data: {
    publishDate: Date;
    guideId: number;
    reviewerId: number;
    score: number;
    text: string;
  }): Promise<Review> {
    try {
      const review = await this.prismaService.review.create({
        data: {
          publishDate: data.publishDate,
          guideId: data.guideId,
          reviewerId: data.reviewerId,
          score: data.score,
          text: data.text,
        },
      });
      return review;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new FailedRelationConstraintError('relation constraint failed');
        }
      }
      throw e;
    }
  }
}
