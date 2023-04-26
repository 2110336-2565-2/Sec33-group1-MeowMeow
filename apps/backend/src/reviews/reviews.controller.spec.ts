import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import {
  AccountMetadata,
  CreateReviewRequest,
  CreateReviewResponse,
} from 'types';
import { AuthModule } from '../auth/auth.module';
import { Role } from 'database';
import { InvalidRequestError } from '../auth/auth.commons';
import { FailedRelationConstraintError } from './reviews.common';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ReviewsController', () => {
  let controller: ReviewsController;
  const mockService = {
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
          useValue: mockService,
        },
      ],
    }).compile();
    controller = module.get(ReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create reviews', () => {
    const userMockData = {
      account: {
        userId: 5,
        username: 'John',
        roles: [Role.USER],
      },
    };
    const mockData: CreateReviewRequest = {
      guideId: 5,
      score: 4,
      text: 'roremeasysum',
    };
    const mockGuideIdList = [5, 7, 9];
    let result = null;
    let publishDateMock: Date = null;
    beforeEach(async () => {
      // mock createReview function for service
      mockService.createReview = jest.fn();
      jest
        .spyOn(mockService, 'createReview')
        .mockImplementation(
          async (
            userId: number,
            req: CreateReviewRequest,
          ): Promise<CreateReviewResponse> => {
            if (
              !Number.isInteger(req.score) &&
              (req.score % 1).toFixed(1) !== '0.5'
            ) {
              throw new InvalidRequestError(
                'review score must be divisible with .5',
              );
            }
            if (req.score < 0 || req.score > 5) {
              throw new InvalidRequestError('score should be between 0 and 5');
            }
            if (!mockGuideIdList.includes(req.guideId)) {
              throw new FailedRelationConstraintError(
                'relation constraint failed',
              );
            }
            // success
            publishDateMock = new Date();
            return {
              message: 'success',
              publishDate: publishDateMock,
              id: 2,
              guideId: req.guideId,
              reviewerId: userId,
              score: req.score,
              text: req.text,
            };
          },
        );
      result = await controller.addReview(userMockData, mockData);
    });

    // test cases
    it('score is not integer or .5', async () => {
      try {
        await controller.addReview(userMockData, {
          guideId: mockGuideIdList[0],
          score: 4.3,
          text: mockData.text,
        });
      } catch (error) {
        expect(error.message).toMatch('review score must be divisible with .5');
      }
    });

    it('score < 0', async () => {
      try {
        await controller.addReview(userMockData, {
          guideId: mockGuideIdList[0],
          score: -1,
          text: mockData.text,
        });
      } catch (error) {
        expect(error).toStrictEqual(
          new HttpException(
            'score should be between 0 and 5',
            HttpStatus.BAD_REQUEST,
          ),
        );
      }
    });

    it('score > 5', async () => {
      try {
        await controller.addReview(userMockData, {
          guideId: mockGuideIdList[0],
          score: 50,
          text: mockData.text,
        });
      } catch (error) {
        expect(error).toStrictEqual(
          new HttpException(
            'score should be between 0 and 5',
            HttpStatus.BAD_REQUEST,
          ),
        );
      }
    });

    it("guideId doesn't exist", async () => {
      try {
        await controller.addReview(userMockData, {
          guideId: 0,
          score: mockData.score,
          text: mockData.text,
        });
      } catch (error) {
        expect(error.message).toMatch('relation constraint failed');
      }
    });

    it('invalid account data', async () => {
      expect(
        controller.addReview('random data', {
          guideId: 0,
          score: mockData.score,
          text: mockData.text,
        }),
      ).rejects.toThrow(
        new HttpException(
          'internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });

    it('should be successfull', async () => {
      expect(await controller.addReview(userMockData, mockData)).toStrictEqual({
        message: 'success',
        publishDate: publishDateMock,
        id: 2,
        guideId: mockData.guideId,
        reviewerId: 5,
        score: mockData.score,
        text: mockData.text,
      });
    });
  });
});
