import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreatePostRequest,
  CreatePostResponse,
  UpdatePostRequest,
  UpdatePostResponse,
} from '../../../../packages/types/src';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject('PostsService') private readonly postsService: PostsService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPost(
    @Body() createPostDto: CreatePostRequest,
    @Res({ passthrough: true }) res,
  ) {
    // TODO: Implement this
    try {
      const resBody = await this.postsService.createPost(createPostDto);
      res.status(HttpStatus.CREATED).send(resBody);
    } catch (e) {
      //TODO: Handle error

      throw new HttpException(
        { message: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('id')
  async updatePost(
    @Body() updatePostDto: UpdatePostRequest,
    @Param('id') id: number,
    @Res({ passthrough: true }) res,
  ) {
    // TODO: Implement this
    try {
      const resBody = await this.postsService.updatePost(updatePostDto, id);
      res.status(HttpStatus.OK).send(resBody);
    } catch (e) {
      //TODO: Handle error

      throw new HttpException(
        { message: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number, @Res({ passthrough: true }) res) {
    // TODO: Implement this
    try {
      const resBody = await this.postsService.deletePost(id);
      res.status(HttpStatus.OK).send(resBody);
    } catch (e) {
      //TODO: Handle error

      throw new HttpException(
        { message: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
