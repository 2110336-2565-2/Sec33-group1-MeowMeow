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
  Res,
} from '@nestjs/common';
import { CreateUserRequest } from './dto/createUser.dto';
import { AccountMetadata } from 'src/auth/auth.dto';
import { PropertyAlreadyUsedError, UserNotFoundError } from './user.common';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('UserService') private readonly userService: UserService,
  ) {}

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) userId: number,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const resBody = await this.userService.getUserById({ id: userId });
      res.status(HttpStatus.OK).send(resBody);
    } catch (e) {
      console.log(e);
      if (e instanceof UserNotFoundError) {
        throw new HttpException(
          'user with given id not found',
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('register')
  async createUser(
    @Body() data: CreateUserRequest,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const resBody = await this.userService.create(data);
      res.status(HttpStatus.CREATED).send(resBody);
    } catch (e) {
      console.log(e);
      if (e instanceof PropertyAlreadyUsedError) {
        throw new HttpException(e.message, HttpStatus.CONFLICT);
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('user')
  async editUserProfile(
    @Req() req,
    @Body() reqBody,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const account: AccountMetadata = req.account;
      const resBody = await this.userService.updateUser(
        account.userId,
        reqBody,
      );
      res.status(HttpStatus.CREATED).send(resBody);
    } catch (e) {
      console.log(e);
      if (e instanceof PropertyAlreadyUsedError) {
        throw new HttpException(e.message, HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
