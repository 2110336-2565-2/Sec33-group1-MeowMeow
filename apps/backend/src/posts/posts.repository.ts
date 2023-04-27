import { Injectable } from '@nestjs/common';
import { Prisma } from 'database';
import { GuidesRepository } from '../guides/guides.repository';
import {
  CreatePostRequest,
  SearchPostsRequest,
  UpdatePostRequest,
} from 'types';
import { PrismaService } from '../prisma/prisma.service';
import {
  AccessDeniedError,
  FailedRelationConstraintError,
  NotFoundError,
} from './posts.common';

function toJson(data) {
  return JSON.stringify(data, (_, v) =>
    typeof v === 'bigint' ? `${v}n` : v,
  ).replace(/"(-?\d+)n"/g, (_, a) => a);
}

@Injectable()
export class PostsRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly guidesRepo: GuidesRepository,
  ) {}

  async getPost(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: { id },
      include: {
        PostLocation: {
          select: {
            location: true,
          },
        },
      },
    });
    return post;
  }

  async createPost(userId: number, data: CreatePostRequest) {
    try {
      return await this.prismaService.post.create({
        data: {
          title: data.title,
          content: data.content,
          authorId: userId,
          fee: data.fee,
          tags: data.tags,
          maxParticipant: data.maxParticipant,
          contactInfo: data.contactInfo,
          PostLocation: {
            createMany: {
              data: (
                await this.guidesRepo.getOrCreateLocationsID(data.locations)
              ).map((e) => ({ locationId: e })),
            },
          },
        },
        include: {
          PostLocation: {
            select: {
              location: true,
            },
          },
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new FailedRelationConstraintError('relation constraint failed');
        }
      }
      throw e;
    }
  }

  async updateUserPost(
    postId: number,
    userId: number,
    data: UpdatePostRequest,
  ) {
    try {
      const post = await this.prismaService.post.findUnique({
        where: { id: postId },
      });

      if (!post) throw new NotFoundError('post not found');
      if (post.authorId !== userId)
        throw new AccessDeniedError('access denied');
      if (data.locations) {
        await this.prismaService.$transaction([
          this.prismaService.postLocation.deleteMany({
            where: { postId },
          }),
          this.prismaService.postLocation.createMany({
            data: (
              await this.guidesRepo.getOrCreateLocationsID(data.locations)
            ).map((e) => ({ locationId: e, postId })),
          }),
        ]);
      }
      const updatePost = await this.prismaService.post.update({
        where: { id: postId },
        data: {
          title: data.title,
          content: data.content,
          fee: data.fee,
          tags: data.tags,
          maxParticipant: data.maxParticipant,
          contactInfo: data.contactInfo,
        },
        include: {
          PostLocation: {
            select: {
              location: true,
            },
          },
        },
      });
      return updatePost;
    } catch (e) {
      throw e;
    }
  }

  async deleteUserPost(postId: number, userId: number) {
    try {
      const post = await this.prismaService.post.findUnique({
        where: { id: postId },
      });

      if (!post) throw new NotFoundError('post not found');
      if (post.authorId !== userId)
        throw new AccessDeniedError('access denied');
      const deletePost = await this.prismaService.post.delete({
        where: { id: postId },
        include: {
          PostLocation: {
            select: {
              location: true,
            },
          },
        },
      });
      if (!deletePost) throw new NotFoundError('post not found');
      return deletePost;
    } catch (e) {
      throw e;
    }
  }

  async searchPosts(searchData: SearchPostsRequest): Promise<{
    posts: any[];
    postsCount: number;
  }> {
    try {
      const maxFeeCondition = Prisma.sql`AND pp.fee <= ${searchData.fee}`;
      const textCondition = Prisma.sql`AND (
        pp.title LIKE '%${searchData.text}%'
        OR
        pp.content LIKE '%${searchData.text}%'
      )`;
      const minReviewCondition = Prisma.sql`WHERE "avg_review_score" >= ${searchData.reviewScore}`;
      const locationCondition = Prisma.sql`WHERE "Location"."locationName" IN (${
        searchData.locations ? searchData.locations.join() : null
      })`;

      const results = await this.prismaService.$queryRaw<any[]>`
        WITH guideid_with_avg_review_score AS (
          SELECT
            "Guide"."id" as id,
            AVG("Review"."score") AS avg_review_score
          FROM
            "Guide"
          LEFT JOIN "Review" ON "Guide"."id" = "Review"."guideId"
          GROUP BY
            "Guide"."id"
          ),
          guideid_with_satisfied_avg_review_score AS (
              SELECT
                  "id",
                  "avg_review_score"
              FROM
                  guideid_with_avg_review_score
              ${searchData.reviewScore ? minReviewCondition : Prisma.empty}
          ),
          all_location AS (
              SELECT
                  p.id AS "postId",
                  ARRAY_AGG(lx."locationName") AS "locations"
              FROM
                  "Post" AS p
                  LEFT JOIN "PostLocation" px ON p."id" = px."postId"
                  INNER JOIN "Location" lx ON px."locationId" = lx."id"
              GROUP BY
                  p.id
          ),
          post_having_provided_location AS (
            SELECT DISTINCT("Post"."id") as id
            FROM "Post"
            LEFT JOIN "PostLocation" ON "Post"."id" = "PostLocation"."postId"
            INNER JOIN "Location" ON "Location"."id" = "PostLocation"."locationId"
            ${searchData.locations ? locationCondition : Prisma.empty}
          )
          SELECT
              c1."avg_review_score" AS "averageReviewScore",
              pp.id,
              pp."createdAt",
              pp."updatedAt",
              pp.title,
              pp."content",
              pp."authorId",
              pp.tags,
              pp.fee,
              pp."contactInfo",
              pp."maxParticipant",
              "Guide"."id" AS "guideId",
              a1.locations AS locations
          FROM "Post" pp
              INNER JOIN "all_location" a1 ON a1."postId" = pp.id
              INNER JOIN "User" ON "User"."id" = pp."authorId"
              INNER JOIN "Guide" ON "Guide"."userId" = "User"."id"
              INNER JOIN "guideid_with_satisfied_avg_review_score" c1 ON "Guide"."id" = c1."id"
              INNER JOIN "post_having_provided_location" c2 ON pp."id" = c2.id
          WHERE
              TRUE
              ${searchData.fee ? maxFeeCondition : Prisma.empty}
              ${searchData.text ? textCondition : Prisma.empty}
          ORDER BY
              pp.id
          OFFSET ${searchData.offset} LIMIT ${searchData.limit}
      `;

      const count = await this.prismaService.$queryRaw<any[]>`
        WITH guideid_with_avg_review_score AS (
          SELECT
            "Guide"."id" as id,
            AVG("Review"."score") AS avg_review_score
          FROM
            "Guide"
          LEFT JOIN "Review" ON "Guide"."id" = "Review"."guideId"
          GROUP BY
            "Guide"."id"
          ),
          guideid_with_satisfied_avg_review_score AS (
              SELECT
                  "id",
                  "avg_review_score"
              FROM
                  guideid_with_avg_review_score
              ${searchData.reviewScore ? minReviewCondition : Prisma.empty}
          ),
          all_location AS (
              SELECT
                  p.id AS "postId",
                  ARRAY_AGG(lx."locationName") AS "locations"
              FROM
                  "Post" AS p
                  LEFT JOIN "PostLocation" px ON p."id" = px."postId"
                  INNER JOIN "Location" lx ON px."locationId" = lx."id"
              GROUP BY
                  p.id
          ),
          post_having_provided_location AS (
            SELECT DISTINCT("Post"."id") as id
            FROM "Post"
            LEFT JOIN "PostLocation" ON "Post"."id" = "PostLocation"."postId"
            INNER JOIN "Location" ON "Location"."id" = "PostLocation"."locationId"
            ${searchData.locations ? locationCondition : Prisma.empty}
          )
          SELECT
              COUNT(*)
          FROM "Post" pp
              INNER JOIN "all_location" a1 ON a1."postId" = pp.id
              INNER JOIN "User" ON "User"."id" = pp."authorId"
              INNER JOIN "Guide" ON "Guide"."userId" = "User"."id"
              INNER JOIN "guideid_with_satisfied_avg_review_score" c1 ON "Guide"."id" = c1."id"
              INNER JOIN "post_having_provided_location" c2 ON pp."id" = c2.id
          WHERE
              TRUE
              ${searchData.fee ? maxFeeCondition : Prisma.empty}
              ${searchData.text ? textCondition : Prisma.empty}
      `;
      if (!results.length) {
        return {
          posts: [],
          postsCount: 0,
        };
      }

      return {
        posts: results.map((e) => {
          return {
            id: e.id,
            authorId: e.authorId,
            guideId: e.guideId,
            title: e.title,
            content: e.content ?? null,
            tags: e.tags ?? null,
            locations: e.locations ?? null,
            fee: e.fee,
            maxParticipant: e.maxParticipant,
            contactInfo: e.contactInfo ?? null,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
          };
        }),
        postsCount: parseInt(toJson(count[0].count)),
      };
    } catch (e) {
      throw e;
    }
  }
}
