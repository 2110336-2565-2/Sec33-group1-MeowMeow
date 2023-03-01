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
    const post = await this.postsRepo.updatePost(id, {
      title: updatePostDto.title,
      content: updatePostDto.content,
      fee: updatePostDto.fee,
      tags: updatePostDto.tags,
    });
    const fPost = post.formerPost;
    const uPost = post.updatedPost;

    return {
      message: 'success',
      formerPost: {
        id: fPost.id,
        createdAt: fPost.createdAt,
        updatedAt: fPost.updatedAt,
        title: fPost.title,
        content: fPost.content,
        authorId: fPost.authorId,
        fee: fPost.fee.toNumber(),
        tags: fPost.tags,
      },
      updatedPost: {
        id: uPost.id,
        createdAt: uPost.createdAt,
        updatedAt: uPost.updatedAt,
        title: uPost.title,
        content: uPost.content,
        authorId: uPost.authorId,
        fee: uPost.fee.toNumber(),
        tags: uPost.tags,
      },
    };
  }
  async deletePost(id: number): Promise<DeletePostResponse> {
    //TODO: Implement this
    const post = await this.postsRepo.deletePost(id);
    return {
      message: 'success',
      id: post.id,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      fee: post.fee.toNumber(),
      tags: post.tags,
    };
  }
}
