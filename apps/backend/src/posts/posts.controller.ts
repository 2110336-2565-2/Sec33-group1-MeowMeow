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
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  AccountMetadata,
  CreatePostRequest,
  CreatePostResponse,
  DeletePostResponse,
  UpdatePostRequest,
  UpdatePostResponse,
} from 'types';
import { PostsService } from './posts.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject('PostsService') private readonly postsService: PostsService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard)
  async createPost(
    @Req() req,
    //@Body() createPostDto: CreatePostRequest,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const requestBody: CreatePostRequest = req.body;
      const account: AccountMetadata = req.account;
      // check if user is authenticated
      if (!account) {
        throw new HttpException(
          { message: 'User is not authenticated' },
          HttpStatus.UNAUTHORIZED,
        );
      }
      // check if user is authorized
      if (account.userId != requestBody.authorId) {
        throw new HttpException(
          { message: "User is not allow to post in other user's names" },
          HttpStatus.FORBIDDEN,
        );
      }

      const resBody: CreatePostResponse = await this.postsService.createPost(
        requestBody,
      );
      res.status(HttpStatus.CREATED).send(resBody);
    } catch (e) {
      //TODO: Handle error
      if (e instanceof HttpException) {
        throw e;
      } else
        throw new HttpException(
          { message: e.message },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  @Put('id')
  async updatePost(
    @Req() req,
    @Param('id') id: number,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const account: AccountMetadata = req.account;
      const requestBody: UpdatePostRequest = req.body;
      // check if user is authenticated
      if (!account) {
        throw new HttpException(
          { message: 'User is not authenticated' },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const resBody: UpdatePostResponse = await this.postsService.updatePost(
        requestBody,
        id,
        account.userId,
      );
      res.status(HttpStatus.OK).send(resBody);
    } catch (e) {
      if (
        e instanceof HttpException &&
        e.getStatus() === HttpStatus.UNAUTHORIZED
      ) {
        throw e;
      } else
        throw new HttpException(
          { message: e.message },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  @Delete(':id')
  async deletePost(
    @Req() req,
    @Param('id') id: number,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const account: AccountMetadata = req.account;

      // check if user is authenticated
      if (!account) {
        throw new HttpException(
          { message: 'User is not authenticated' },
          HttpStatus.UNAUTHORIZED,
        );
      }
      const resBody: DeletePostResponse = await this.postsService.deletePost(
        id,
        account.userId,
      );
      res.status(HttpStatus.OK).send(resBody);
    } catch (e) {
      if (
        e instanceof HttpException &&
        e.getStatus() === HttpStatus.UNAUTHORIZED
      ) {
        throw e;
      } else
        throw new HttpException(
          { message: e.message },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
}
