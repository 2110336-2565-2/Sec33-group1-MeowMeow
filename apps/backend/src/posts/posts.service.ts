import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    postId: number,
    authorId: number,
  ): Promise<UpdatePostResponse>;
  deletePost(postId: number, authorId: number): Promise<DeletePostResponse>;
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
    postId: number,
    authorId: number,
  ): Promise<UpdatePostResponse> {
    //TODO: Implement this

    // get post by id
    const fPost = await this.postsRepo.getPost(postId);
    if (!fPost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    // check if editor is the author of the post
    else if (fPost.authorId != authorId) {
      throw new HttpException(
        'You are forbidden from editing thispost',
        HttpStatus.FORBIDDEN,
      );
    }

    const uPost = await this.postsRepo.updatePost(postId, {
      title: updatePostDto.title,
      content: updatePostDto.content,
      fee: updatePostDto.fee,
      tags: updatePostDto.tags,
    });

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
  async deletePost(
    postId: number,
    authorId: number,
  ): Promise<DeletePostResponse> {
    //get post by id
    const fPost = await this.postsRepo.getPost(postId);
    if (!fPost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    // check if editor is the author of the post
    else if (fPost.authorId != authorId) {
      throw new HttpException(
        'You are forbidden from deleting this post',
        HttpStatus.FORBIDDEN,
      );
    }

    const post = await this.postsRepo.deletePost(postId);
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
