import { Injectable } from '@nestjs/common';
import {
  CreatePostRequest,
  CreatePostResponse,
  DeletePostResponse,
  GetPostResponse,
  UpdatePostRequest,
  UpdatePostResponse,
  SearchPostsRequest,
  SearchPostsResponse,
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
    postId: number,
    userId: number,
    updatePostDto: UpdatePostRequest,
  ): Promise<UpdatePostResponse>;
  deletePost(postId: number, userId: number): Promise<DeletePostResponse>;
  searchPosts(searchData: SearchPostsRequest): Promise<SearchPostsResponse>;
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
      locations: post.PostLocation.map((e) => e.location.locationName),
      fee: post.fee.toNumber(),
      contactInfo: post.contactInfo,
      maxParticipant: post.maxParticipant,
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
      contactInfo: createPostDto.contactInfo,
      maxParticipant: createPostDto.maxParticipant,
      locations: createPostDto.locations,
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
      contactInfo: post.contactInfo,
      maxParticipant: post.maxParticipant,
      locations: post.PostLocation.map((e) => e.location.locationName),
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
      contactInfo: post.contactInfo,
      maxParticipant: post.maxParticipant,
      locations: post.PostLocation.map((e) => e.location.locationName),
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
      contactInfo: post.contactInfo,
      maxParticipant: post.maxParticipant,
      locations: post.PostLocation.map((e) => e.location.locationName),
    };
  }

  async searchPosts(
    searchData: SearchPostsRequest,
  ): Promise<SearchPostsResponse> {
    const posts = await this.postsRepo.searchPosts(searchData);
    return {
      posts: posts.posts.map((e) => ({
        id: e.id,
        authorId: e.authorId,
        guideId: e.author.guide.id,
        title: e.title,
        content: e.content,
        tags: e.tags,
        locations: e.PostLocation.map((e) => e.location.locationName),
        fee: e.fee.toNumber(),
        maxParticipant: e.maxParticipant,
        contactInfo: e.contactInfo,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
      })),
      postsCount: posts.postsCount,
    };
  }
}
