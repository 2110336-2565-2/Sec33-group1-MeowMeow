import { Injectable } from '@nestjs/common';
import { Prisma } from 'database';
import { GuidesRepository } from 'src/guides/guides.repository';
import { CreatePostRequest, UpdatePostRequest } from 'types';
import { PrismaService } from '../prisma/prisma.service';
import {
  AccessDeniedError,
  FailedRelationConstraintError,
  NotFoundError,
} from './posts.common';
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
}
