import { Injectable } from '@nestjs/common';
import { Prisma, Review } from 'database';
import { PrismaService } from 'src/prisma/prisma.service';
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

  async getGuideReviews(param: { id: number; page: number }): Promise<
    {
      id: number;
      guideId: number;
      reviewerId: number;
      score: number;
      text: string;
    }[]
  > {
    try {
      const maxPage = 10;
      const results = await this.prismaService.review.findMany({
        where: {
          guideId: param.id,
        },
        skip: maxPage * (param.page - 1),
        take: maxPage,
      });
      let reviews = new Array(results.length);
      for (let i = 0; i < results.length; i++) {
        reviews[i] = {
          reviewId: results[i].id,
          publishDate: results[i].publishDate,
          score: results[i].score.toNumber(),
          text: results[i].text,
          reviewerId: results[i].reviewerId,
          guideId: results[i].guideId,
        };
      }
      return reviews;
    } catch (e) {
      console.log(e);
    }
  }
}
