import { Injectable } from '@nestjs/common';
import { Prisma } from 'database';
import { PrismaService } from 'src/prisma/prisma.service';
import { FailedRelationConstraintError } from 'src/reviews/reviews.common';
@Injectable()
export class PostsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getPost(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: { id },
    });
    return post;
  }
  async createPost(data: {
    title: string;
    createdAt: Date;
    content: string;
    authorId: number;
    fee: number;
    tags: string[];
  }) {
    try {
      const post = await this.prismaService.post.create({
        data: {
          createdAt: data.createdAt,
          title: data.title,
          content: data.content,
          authorId: data.authorId,
          fee: data.fee,
          tags: data.tags,
        },
      });
      return post;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new FailedRelationConstraintError('relation constraint failed');
        }
      }
      throw e;
    }
  }

  async updatePost(
    id: number,
    data: {
      title: string;
      content: string;
      fee: number;
      tags: string[];
    },
  ) {
    try {
      const post = await this.prismaService.post.update({
        where: { id },
        data: {
          title: data.title,
          content: data.content,
          fee: data.fee,
          tags: data.tags,
        },
      });
      return post;
    } catch (e) {
      //TODO: A more specific error handling is needed
      throw e;
    }
  }
  async deletePost(id: number) {
    try {
      const post = await this.prismaService.post.delete({
        where: { id },
      });
      return post;
    } catch (e) {
      //TODO: A more specific error handling is needed
      throw e;
    }
  }
}
