import { Injectable } from '@nestjs/common';
import {
  CreatePostRequest,
  CreatePostResponse,
  DeletePostResponse,
  UpdatePostRequest,
  UpdatePostResponse,
} from 'types';

import { PostsRepository } from './posts.repository';
export interface PostsService {
  createPost(createPostDto: CreatePostRequest): Promise<CreatePostResponse>;
  updatePost(
    updatePostDto: UpdatePostRequest,
    id: number,
  ): Promise<UpdatePostResponse>;
  deletePost(id: number): Promise<DeletePostResponse>;
}
@Injectable()
export class PostsServiceImpl {
  constructor(private readonly postsRepo: PostsRepository) {}

  async createPost(
    createPostDto: CreatePostRequest,
  ): Promise<CreatePostResponse> {
    //TODO: Implement this
    const post = await this.postsRepo.createPost({
      title: createPostDto.title,
      createdAt: new Date(),
      content: createPostDto.content,
      authorId: createPostDto.authorId,
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
    updatePostDto: UpdatePostRequest,
    id: number,
  ): Promise<UpdatePostResponse> {
    //TODO: Implement this
  }
  async deletePost(id: number): Promise<DeletePostResponse> {
    //TODO: Implement this
  }
}
