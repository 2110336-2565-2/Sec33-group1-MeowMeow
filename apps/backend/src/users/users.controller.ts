import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/createUser.dto';
import { Request } from 'express';
import { AccountMetadata } from 'src/auth/auth.dto';
import { UpdateUserRequest } from './dto/updateProfile.dto';
import { PropertyAlreadyUsedError, UserNotFoundError } from './user.common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(
    @Body() data: CreateUserRequest,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const resBody = await this.usersService.create(data);
      res.status(HttpStatus.CREATED).send(resBody);
    } catch (e) {
      console.log(e);
      if (e instanceof PropertyAlreadyUsedError) {
        throw new HttpException(e.message, HttpStatus.CONFLICT);
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('guideVerify')
  submitGuideVerification() {
    return { msg: 'submission sent' };
  }

  @Put('user')
  async editUserProfile(
    @Req() req,
    @Body() reqBody,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const account: AccountMetadata = req.account;
      const resBody = await this.usersService.updateUser(
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
