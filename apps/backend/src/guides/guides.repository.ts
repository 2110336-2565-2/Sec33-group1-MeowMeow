import { Injectable } from '@nestjs/common';
import { Prisma } from 'database';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetGuideByIdResponse, SearchGuidesResponse } from 'types';
import {
  FailedRelationConstraintError,
  RecordAlreadyExist,
} from './guides.common';

@Injectable()
export class GuidesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async paginateGuides(filter: {
    offset: number;
    limit: number;
    location?: string;
    minReviewScore?: number;
    startDate?: Date;
    endDate?: Date;
  }): Promise<SearchGuidesResponse> {
    try {
      const minReviewCondition = Prisma.sql`WHERE "avg_review_score" >= ${filter.minReviewScore}`;
      const locationCondition = Prisma.sql`WHERE "Location"."locationName" = ${filter.location}`;

      const results = await this.prismaService.$queryRaw<any[]>`
        WITH guideid_with_avg_review_score AS (
          SELECT "Guide"."id" as id, AVG("Review"."score") AS avg_review_score
          FROM "Guide"
          LEFT JOIN "Review" ON "Guide"."id" = "Review"."guideId"
          GROUP BY "Guide"."id"
        ),
        guideid_with_satisfied_avg_review_score AS (
          SELECT "id", "avg_review_score"
          FROM guideid_with_avg_review_score
          ${filter.minReviewScore ? minReviewCondition : Prisma.empty}
        ),
        guideid_having_provided_location AS (
          SELECT DISTINCT("Guide"."id") as id
          FROM "Guide"
          LEFT JOIN "Location" ON "Guide"."id" = "Location"."guideId"
          ${filter.location ? locationCondition : Prisma.empty}
        )
        SELECT "Guide"."id", "Guide"."certificateId",
        "User"."firstName", "User"."lastName",
        c1."avg_review_score" as "averageReviewScore"
        FROM "Guide"
        INNER JOIN "User" ON "Guide"."userId" = "User"."id"
        INNER JOIN "guideid_with_satisfied_avg_review_score" c1 ON "Guide"."id" = c1.id
        INNER JOIN "guideid_having_provided_location" c2 ON "Guide"."id" = c2.id
        OFFSET ${filter.offset} LIMIT ${filter.limit}
      `;

      return results.map((e) => {
        return {
          guideId: e.id,
          firstName: e.firstName ?? null,
          lastName: e.lastName ?? null,
          certificateId: e.certificate ?? null,
          averageReviewScore: e.averageReviewScore ?? null,
        };
      });
    } catch (e) {
      throw e;
    }
  }

  async getGuideById(guideId: number): Promise<GetGuideByIdResponse> {
    try {
      const guideResult = await this.prismaService.guide.findUnique({
        where: {
          id: guideId,
        },
        include: {
          GuideLocation: {
            select: {
              location: true,
            },
          },
          GuideTourStyle: {
            select: {
              tourStyle: true,
            },
          },
        },
      });
      if (!guideResult) return null;
      const userResult = await this.prismaService.user.findUnique({
        where: {
          id: guideResult.userId,
        },
      });
      const scoreResult = await this.prismaService.review.aggregate({
        _avg: {
          score: true,
        },
        where: {
          guideId: guideResult.id,
        },
      });
      return {
        guideId: guideResult.id,
        userId: guideResult.userId,
        firstName: userResult.firstName,
        lastName: userResult.lastName,
        certificateId: guideResult.certificateId,
        averageReviewScore: scoreResult._avg.score?.toNumber() | 0,
        locations: guideResult.GuideLocation.map(
          (e) => e.location.locationName,
        ),
        tourStyles: guideResult.GuideTourStyle.map(
          (e) => e.tourStyle.tourStyleName,
        ),
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getOrCreateLocationsID(locations: string[]): Promise<number[]> {
    await this.prismaService.location.createMany({
      data: locations.map((e) => ({ locationName: e })),
      skipDuplicates: true,
    });
    return (
      await this.prismaService.location.findMany({
        where: {
          locationName: {
            in: locations,
          },
        },
        select: {
          id: true,
        },
        orderBy: {
          id: 'asc',
        },
      })
    ).map((e) => e.id);
  }

  async getOrCreateTourStylesID(tourStyles: string[]): Promise<number[]> {
    await this.prismaService.tourStyle.createMany({
      data: tourStyles.map((e) => ({ tourStyleName: e })),
      skipDuplicates: true,
    });
    return (
      await this.prismaService.tourStyle.findMany({
        where: {
          tourStyleName: {
            in: tourStyles,
          },
        },
        select: {
          id: true,
        },
        orderBy: {
          id: 'asc',
        },
      })
    ).map((e) => e.id);
  }

  async registerUserForGuide(data: {
    userId: number;
    certificateId: string;
    paymentId: string;
    brandBankAccount: string;
    nameBankAccount: string;
    numberBankAccount: string;
    taxId?: string;
    locations: string[];
    tourStyles: string[];
  }): Promise<{
    guideId: number;
    certificateId: string;
  }> {
    try {
      const guide = await this.prismaService.guide.create({
        data: {
          userId: data.userId,
          certificateId: data.certificateId,
          paymentId: data.paymentId,
          brandBankAccount: data.brandBankAccount,
          nameBankAccount: data.nameBankAccount,
          numberBankAccount: data.numberBankAccount,
          taxId: data.taxId,
          GuideLocation: {
            createMany: {
              data: (
                await this.getOrCreateLocationsID(data.locations)
              ).map((e) => ({ locationId: e })),
            },
          },
          GuideTourStyle: {
            createMany: {
              data: (
                await this.getOrCreateTourStylesID(data.tourStyles)
              ).map((e) => ({ tourStyleId: e })),
            },
          },
        },
      });
      return {
        guideId: guide.id,
        certificateId: guide.certificateId,
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code == 'P2002') {
          throw new RecordAlreadyExist(
            'user with given ID has already been a guide',
          );
        }
        if (e.code === 'P2003') {
          throw new FailedRelationConstraintError('relation constraint failed');
        }
      }
      throw e;
    }
  }

  async getGuideIDByReviewScore(
    minScore?: number,
    maxScore?: number,
  ): Promise<number[]> {
    const options = {};

    if (minScore) options['gte'] = minScore;
    if (maxScore) options['lte'] = maxScore;
    const guides = await this.prismaService.review.groupBy({
      by: ['guideId'],
      _avg: {
        score: true,
      },
      having: {
        score: {
          _avg: options,
        },
      },
    });

    return guides.map((e) => e.guideId);
  }
}
