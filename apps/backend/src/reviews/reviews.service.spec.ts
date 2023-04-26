import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ReviewsServiceImpl } from './reviews.service';
import { ReviewsRepository } from './reviews.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewRequest } from 'types';
import { AuthModule } from '../auth/auth.module';
import { Prisma, Review } from 'database';
import { FailedRelationConstraintError } from './reviews.common';
import { HttpException } from '@nestjs/common';
import { InvalidRequestError } from '../auth/auth.commons';

describe('ReviewsService', () => {
  let service: ReviewsService;
  const mockRepository = {
    createReview: null,
    getGuideReviews: null,
  };
  // let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [ReviewsController],
      providers: [
        {
          provide: 'ReviewsService',
          useClass: ReviewsServiceImpl,
        },

        {
          provide: ReviewsRepository,
          useValue: mockRepository,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    })
      // .overrideProvider(PrismaService)
      // .useValue(mockDeep<PrismaClient>())
      .compile();
    service = module.get<ReviewsService>('ReviewsService');
    // prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create reviews', () => {
    const mockUserId: number = 10;
    const mockData: CreateReviewRequest = {
      guideId: 5,
      score: 4,
      text: 'roremeasysum',
    };
    let result = null;
    let publishDateMock: Date = null;
    beforeEach(async () => {
      // mock createReview function for repo
      mockRepository.createReview = jest.fn();
      jest
        .spyOn(mockRepository, 'createReview')
        .mockImplementation(
          async (
            userId: number,
            data: CreateReviewRequest,
          ): Promise<Review> => {
            if (data.guideId != 5) {
              throw new FailedRelationConstraintError(
                'relation constraint failed',
              );
            }
            if (data.score < 0 || data.score > 5) {
              throw new InvalidRequestError('score should be between 0 and 5');
            }
            // success
            publishDateMock = new Date();
            return {
              id: 2,
              publishDate: publishDateMock,
              score: new Prisma.Decimal(data.score),
              text: data.text,
              reviewerId: userId,
              guideId: data.guideId,
            };
          },
        );
      result = await service.createReview(mockUserId, mockData);
    });

    // test cases
    it('should be called 1 time', async () => {
      expect(mockRepository.createReview).toHaveBeenCalledTimes(1);
    });

    it('score is not integer or .5', async () => {
      try {
        await service.createReview(mockUserId, {
          guideId: 5,
          score: 4.3,
          text: mockData.text,
        });
      } catch (error) {
        expect(error.message).toMatch('review score must be divisible with .5');
      }
    });

    it('score < 0', async () => {
      try {
        await service.createReview(mockUserId, {
          guideId: 5,
          score: -1,
          text: mockData.text,
        });
      } catch (error) {
        expect(error).toStrictEqual(
          new InvalidRequestError('score should be between 0 and 5'),
        );
      }
    });

    it('score > 5', async () => {
      try {
        await service.createReview(mockUserId, {
          guideId: 5,
          score: 40,
          text: mockData.text,
        });
      } catch (error) {
        expect(error).toStrictEqual(
          new InvalidRequestError('score should be between 0 and 5'),
        );
      }
    });

    it("guide id doesn't exist", async () => {
      try {
        await service.createReview(mockUserId, {
          guideId: 12,
          score: mockData.score,
          text: mockData.text,
        });
      } catch (error) {
        expect(error.message).toMatch('relation constraint failed');
      }
    });

    it('should be successful', async () => {
      result = await service.createReview(mockUserId, mockData);
      expect(result).toStrictEqual({
        message: 'success',
        publishDate: publishDateMock,
        id: 2,
        guideId: mockData.guideId,
        reviewerId: mockUserId,
        score: mockData.score,
        text: mockData.text,
      });
    });
  });
});
