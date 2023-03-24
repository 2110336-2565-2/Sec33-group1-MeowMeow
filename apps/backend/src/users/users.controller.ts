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
import { CreateUserRequest, AccountMetadata } from 'types';
import { PropertyAlreadyUsedError, UserNotFoundError } from './users.common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

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

  @UseGuards(AuthGuard)
  @Get('/profiles')
  @HttpCode(HttpStatus.OK)
  async getUserProfile(@Req() req) {
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

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id', ParseIntPipe) userId: number) {
    try {
      return await this.usersService.getUserById({ id: userId });
    } catch (e) {
      this.handleException(e);
    }
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() data: CreateUserRequest) {
    try {
      return await this.usersService.create(data);
    } catch (e) {
      this.handleException(e);
    }
  }

  @UseGuards(AuthGuard)
  @Put('/users')
  @HttpCode(HttpStatus.CREATED)
  async editUserProfile(@Req() req, @Body() reqBody) {
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
