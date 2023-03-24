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
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'user with given id not found',
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Get('profiles')
  @HttpCode(HttpStatus.OK)
  async getUserProfile(@Req() req): Promise<GetUserByIdResponse> {
    try {
      const account: AccountMetadata = req.account;
      const resBody = await this.usersService.getUserById({
        id: account.userId,
      });
      return resBody;
    } catch (e) {
      this.handleException(e);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully get the user profile by id',
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
      return await this.usersService.getUserById({ id: userId });
    } catch (e) {
      this.handleException(e);
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully register a new user',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'email or username already used',
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() data: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    try {
      return await this.usersService.create(data);
    } catch (e) {
      this.handleException(e);
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully edit current user profile',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'user with given id not found',
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Put('users')
  @HttpCode(HttpStatus.CREATED)
  async editUserProfile(
    @Req() req,
    @Body() reqBody,
  ): Promise<UpdateUserResponse> {
    try {
      const account: AccountMetadata = req.account;
      const resBody = await this.usersService.updateUser(
        account.userId,
        reqBody,
      );
      return resBody;
    } catch (e) {
      this.handleException(e);
    }
  }
}
