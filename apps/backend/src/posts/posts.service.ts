import { Injectable } from '@nestjs/common';
import {
  CreatePostRequest,
  CreatePostResponse,
  DeletePostResponse,
  GetPostResponse,
  UpdatePostRequest,
  UpdatePostResponse,
} from 'types';
import { NotFoundError } from './posts.common';

import { PostsRepository } from './posts.repository';
export interface PostsService {
  getPostById(postId: number): Promise<GetPostResponse>;
  createPost(
    userId: number,
    createPostDto: CreatePostRequest,
  ): Promise<CreatePostResponse>;
  updatePost(
    updatePostDto: UpdatePostRequest,
    postId: number,
    authorId: number,
  ): Promise<UpdatePostResponse>;
  deletePost(postId: number, authorId: number): Promise<DeletePostResponse>;
}
@Injectable()
export class PostsServiceImpl {
  constructor(private readonly postsRepo: PostsRepository) {}

  async getPostById(postId: number): Promise<GetPostResponse> {
    const post = await this.postsRepo.getPost(postId);

    if (!post) {
      throw new NotFoundError('post not found');
    }
    return {
      message: 'success',
      id: post.id,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      title: post.title,
      content: post.content,
      tags: post.tags,
      fee: post.fee.toNumber(),
    };
  }

  async createPost(
    userId: number,
    createPostDto: CreatePostRequest,
  ): Promise<CreatePostResponse> {
    const post = await this.postsRepo.createPost(userId, {
      title: createPostDto.title,
      content: createPostDto.content,
      fee: createPostDto.fee,
      tags: createPostDto.tags,
    });

    return {
      message: 'success',
      id: post.id,
      createdAt: post.createdAt,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      fee: post.fee.toNumber(),
      tags: post.tags,
    };
  }

  async updatePost(
    postId: number,
    userId: number,
    updatePostDto: UpdatePostRequest,
  ): Promise<UpdatePostResponse> {
    const post = await this.postsRepo.updateUserPost(
      postId,
      userId,
      updatePostDto,
    );

    if (!post) {
      throw new NotFoundError('update post not found');
    }
    return {
      message: 'success',
      id: post.id,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      title: post.title,
      content: post.content,
      tags: post.tags,
      fee: post.fee.toNumber(),
    };
  }

  async deletePost(
    postId: number,
    userId: number,
  ): Promise<DeletePostResponse> {
    const post = await this.postsRepo.deleteUserPost(postId, userId);

    if (!post) {
      throw new NotFoundError('delete post not found');
    }
    return {
      message: 'success',
      id: post.id,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      title: post.title,
      content: post.content,
      tags: post.tags,
      fee: post.fee.toNumber(),
    };
  }
}
