import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  AccountMetadata,
  CreatePostRequest,
  CreatePostResponse,
  DeletePostResponse,
  GetPostResponse,
  SearchPostsRequest,
  SearchPostsResponse,
  UpdatePostRequest,
  UpdatePostResponse,
} from 'types';
import { PostsService } from './posts.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AccessDeniedError,
  FailedRelationConstraintError,
  NotFoundError,
} from './posts.common';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    @Inject('PostsService') private readonly postsService: PostsService,
  ) {}

  handleException(e: Error) {
    console.log(e);

    if (e instanceof NotFoundError)
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    if (e instanceof FailedRelationConstraintError)
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    if (e instanceof AccessDeniedError)
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    throw new HttpException(
      'internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get post successfully',
    type: [GetPostResponse],
  })
  @Get('search')
  @HttpCode(HttpStatus.OK)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async searchPosts(
    @Query() searchData: SearchPostsRequest,
  ): Promise<SearchPostsResponse> {
    try {
      return await this.postsService.searchPosts(searchData);
    } catch (e) {
      this.handleException(e);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get post successfully',
    type: GetPostResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getPostById(
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<GetPostResponse> {
    try {
      return await this.postsService.getPostById(postId);
    } catch (e) {
      this.handleException(e);
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'post created',
    type: CreatePostResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'valid session is not provided',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard)
  async createPost(
    @Req() req,
    @Body() createPostDto: CreatePostRequest,
  ): Promise<CreatePostResponse> {
    try {
      const account: AccountMetadata = req.account;

      return await this.postsService.createPost(account.userId, createPostDto);
    } catch (e) {
      this.handleException(e);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'post updated successfully',
    type: UpdatePostResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'valid session is not provided',
  })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard)
  async updatePost(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() postData: UpdatePostRequest,
  ): Promise<UpdatePostResponse> {
    try {
      const account: AccountMetadata = req.account;

      return await this.postsService.updatePost(id, account.userId, postData);
    } catch (e) {
      this.handleException(e);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'post deleted successfully',
    type: DeletePostResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'valid session is not provided',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'access denied',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deletePost(
    @Req() req,
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<DeletePostResponse> {
    try {
      const account: AccountMetadata = req.account;
      return await this.postsService.deletePost(postId, account.userId);
    } catch (e) {
      this.handleException(e);
    }
  }
}
