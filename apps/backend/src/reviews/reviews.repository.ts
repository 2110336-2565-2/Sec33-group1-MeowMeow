import { Injectable } from '@nestjs/common';
import { Prisma, Review } from 'database';
import { GetGuideReviewsResponse } from 'types';
import { PrismaService } from '../prisma/prisma.service';
import { FailedRelationConstraintError } from './reviews.common';

@Injectable()
export class ReviewsRepository {
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

  async getGuideReviews(
    id: number,
    page: number,
  ): Promise<GetGuideReviewsResponse> {
    try {
      const maxPage = 10;
      const results = await this.prismaService.review.findMany({
        where: {
          guideId: id,
        },
        skip: maxPage * (page - 1),
        take: maxPage,
      });
      return results.map((e) => {
        return {
          guideId: e.guideId,
          reviewId: e.id,
          reviewerId: e.reviewerId,
          score: e.score.toNumber(),
          text: e.text,
          publishDate: e.publishDate,
        };
      });
    } catch (e) {
      console.log(e);
    }
  }
}
