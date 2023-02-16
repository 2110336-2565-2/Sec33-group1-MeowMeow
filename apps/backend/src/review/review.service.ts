import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createReviewType } from 'src/review/utils/types';

export interface ReviewService {
  createReview(req: createReviewType);
}

@Injectable()
export class ReviewServiceImpl {
  constructor(private prisma: PrismaService) {}

  async createReview(reviewData: createReviewType) {
    const rating: number = reviewData.rating;
    if (rating < 0 || rating > 5 || rating % 0.5 != 0) {
      throw new HttpException(
        'Invalid rating, it should be between 0 and 5 and multiple of 0.5',
        HttpStatus.BAD_REQUEST,
      );
    }

    const comment: string = reviewData.comment;
    if (comment.length > 200) {
      throw new HttpException(
        'Comment too long, it should not exceed 200 characters.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // this.demo_review.push(reviewData);
    const review = await this.prisma.review.create({
      data: {
        publishDate: new Date(),
        score: reviewData.rating,
        text: reviewData.comment,
        reviewerId: 20, //holder
        guideId: parseInt(reviewData.guideID),
      },
    });
    // console.log('Pushed Data');
    console.log(review);

    return {};
  }
}
