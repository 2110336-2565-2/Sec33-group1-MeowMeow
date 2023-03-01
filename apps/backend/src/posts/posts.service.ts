import { Injectable } from '@nestjs/common';
import {
  CreatePostRequest,
  CreatePostResponse,
  DeletePostResponse,
  UpdatePostRequest,
  UpdatePostResponse,
} from '../../../../packages/types/src';

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
  constructor() {}
  async createPost(
    createPostDto: CreatePostRequest,
  ): Promise<CreatePostResponse> {
    //TODO: Implement this
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
