import { Injectable } from '@nestjs/common';
import { Sql } from '@prisma/client/runtime';
import { Guide, Prisma, User } from 'database';
import { InvalidRequestError } from 'src/auth/auth.commons';
import { PrismaService } from 'src/prisma/prisma.service';

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
  }): Promise<
    {
      id: number;
      firstName: string;
      lastName: string;
      certificate: string;
      averageReviewScore: number;
    }[]
  > {
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

      var guides = new Array(results.length);
      for (let i = 0; i < results.length; i++) {
        guides[i] = {
          id: results[i].id,
          firstName: results[i].firstName ?? null,
          lastName: results[i].lastName ?? null,
          certificate: results[i].certificate ?? null,
          averageReviewScore: results[i].averageReviewScore ?? null,
        };
      }
      return guides;
    } catch (e) {
      throw e;
    }
  }

  async getGuideById(guideId: number): Promise<{
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    certificate: string;
    averageReviewScore: number;
  }> {
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
      const scoreResult = await this.prismaService.$queryRaw<any>`
      SELECT AVG("Review"."score") AS avg_review_score
        FROM "Review"
        WHERE "Review"."guideId" = ${guideId}
        GROUP BY "Review"."guideId"
      `;
      return {
        id: guideResult.id,
        userId: guideResult.userId,
        firstName: userResult.firstName,
        lastName: userResult.lastName,
        certificate: guideResult.certificate,
        averageReviewScore: scoreResult[0].avg_review_score,
      };
    } catch (e) {
      console.log(e);
    }
  }
}
