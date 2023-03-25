import { Injectable } from '@nestjs/common';
import { Prisma } from 'database';
import { GetGuideByIdResponse, SearchGuidesResponse } from 'types';
import { PrismaService } from '../prisma/prisma.service';
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
        SELECT "Guide"."id", "Guide"."certificate",
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
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async registerUserForGuide(data: {
    userId: number;
    certificate: string;
  }): Promise<{
    guideId: number;
    certificateId: string;
  }> {
    try {
      const guide = await this.prismaService.guide.create({
        data: {
          userId: data.userId,
          certificateId: data.certificate,
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
}
