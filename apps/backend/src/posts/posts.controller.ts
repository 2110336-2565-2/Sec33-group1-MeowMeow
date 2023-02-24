import { Body, Controller, Delete, Post, Put } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Post()
  async createPost(/*@Body() createPostDto: CreatePostDto*/) {
    // TODO: Implement this
  }

  @Put('id')
  async updatePost(/*@Body() updatePostDto: UpdatePostDto*/) {
    // TODO: Implement this
  }

  @Delete(':id')
  async deletePost(/*@Param('id') id: number*/) {
    // TODO: Implement this
  }
}
