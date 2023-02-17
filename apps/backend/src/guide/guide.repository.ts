import { Injectable } from '@nestjs/common';
import { Guide, Prisma } from 'database';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GuideRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async paginateGuides(filter: {
    offset: number;
    limit: number;
    location?: string;
    maxFee?: number;
    minReviewScore?: number;
    startDate?: Date;
    endDate?: Date;
  }): Promise<
    {
      id: number;
      firstName: string;
      lastName: string;
      certificate: string;
      fee: number;
      averageReviewScore: number;
    }[]
  > {
    try {
      const results = await this.prismaService.$queryRaw<any[]>`
      WITH guideid_with_satisfied_avg_review_score AS (
        SELECT "Guide"."id" as id, AVG("Review"."score") AS avg_review_score
        FROM "Guide"
        INNER JOIN "Review" ON "Guide"."id" = "Review"."guideId"
        GROUP BY "Guide"."id"
        ${
          filter.minReviewScore
            ? `HAVING AVG("Review"."score") >= ${filter.minReviewScore}`
            : Prisma.empty
        }
      ),
      guideid_having_provided_location AS (
        SELECT DISTINCT("Guide"."id") as id
        FROM "Guide"
        LEFT JOIN "Location" ON "Guide"."id" = "Location"."guideId"
        ${
          filter.location
            ? `WHERE "Location"."locationName" = ${filter.location}`
            : Prisma.empty
        }
      )
      SELECT "Guide"."id", "Guide"."fee", "Guide"."certificate",
      "User"."firstName", "User"."lastName",
      c1."avg_review_score" as average_review_score
      FROM "Guide"
      INNER JOIN "User" ON "Guide"."userId" = "User"."id"
      INNER JOIN "guideid_with_satisfied_avg_review_score" c1 ON "Guide"."id" = c1.id
      INNER JOIN "guideid_having_provided_location" c2 ON "Guide"."id" = c2.id
      ${
        filter.maxFee ? `WHERE "Guide"."fee" <= ${filter.maxFee}` : Prisma.empty
      }
      OFFSET ${filter.offset} LIMIT ${filter.limit}
    `;

      var guides = new Array(results.length);
      for (let i = 0; i < results.length; i++) {
        guides[i] = {
          id: results[i].id,
          firstName: results[i].firstName,
          lastName: results[i].lastName,
          fee: results[i].fee,
          certificate: results[i].certificate,
          averageReviewScore: results[i].averageReview,
        };
      }
      return guides;
    } catch (e) {
      console.log(e);
    }
  }
}
