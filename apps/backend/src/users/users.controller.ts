import {
  ParseIntPipe,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import {
  CreateUserRequest,
  AccountMetadata,
  GetUserByIdResponse,
  CreateUserResponse,
  UpdateUserResponse,
  UpdateUserRequest,
} from 'types';
import { PropertyAlreadyUsedError, UserNotFoundError } from './users.common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiCookieAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject('UsersService') private readonly usersService: UsersService,
  ) {}

  handleException(e: Error) {
    console.log(e);
    if (e instanceof PropertyAlreadyUsedError)
      throw new HttpException(e.message, HttpStatus.CONFLICT);
    if (e instanceof UserNotFoundError)
      throw new HttpException(
        'user with given id not found',
        HttpStatus.NOT_FOUND,
      );
    throw new HttpException(
      'internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully get current user profile',
    type: GetUserByIdResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'user with given id not found',
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getUserProfile(@Req() req): Promise<GetUserByIdResponse> {
    try {
      const account: AccountMetadata = req.account;
      return await this.usersService.getUserById(account.userId);
    } catch (e) {
      this.handleException(e);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully get the user profile by id',
    type: GetUserByIdResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'user with given id not found',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'user id',
    example: 1,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<GetUserByIdResponse> {
    try {
      return await this.usersService.getUserById(userId);
    } catch (e) {
      this.handleException(e);
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully register a new user',
    type: CreateUserResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'email or username already used',
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() userData: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    try {
      return await this.usersService.create(userData);
    } catch (e) {
      this.handleException(e);
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully edit current user profile',
    type: UpdateUserResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'user with given id not found',
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Put()
  @HttpCode(HttpStatus.CREATED)
  async editUserProfile(
    @Req() req,
    @Body() userData: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    try {
      const account: AccountMetadata = req.account;
      return await this.usersService.updateUser(account.userId, userData);
    } catch (e) {
      this.handleException(e);
    }
  }
}
