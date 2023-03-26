import { Injectable } from '@nestjs/common';
import { Post, Prisma } from 'database';
import { CreatePostRequest, UpdatePostRequest } from 'types';
import { PrismaService } from '../prisma/prisma.service';
import { FailedRelationConstraintError } from './posts.common';
@Injectable()
export class PostsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getPost(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: { id },
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
  ): Promise<Post> {
    try {
      const post = await this.prismaService.post.updateMany({
        where: { id: postId, authorId: userId },
        data: {
          title: data.title,
          content: data.content,
          fee: data.fee,
          tags: data.tags,
        },
      });
      return post.count === 1 ? post[0] : null;
    } catch (e) {
      throw e;
    }
  }

  async deleteUserPost(postId: number, userId: number): Promise<Post> {
    try {
      const post = await this.prismaService.post.deleteMany({
        where: { id: postId, authorId: userId },
      });
      return post.count === 1 ? post[0] : null;
    } catch (e) {
      throw e;
    }
  }
}
