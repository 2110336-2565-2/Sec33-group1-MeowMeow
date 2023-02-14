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
import { CreateUserDto } from './dto/createUser.dto';
import { Request } from 'express';
import { AccountMetadata } from 'src/auth/auth.dto';
import { UpdateUserRequest } from './dto/updateProfile.dto';
import { UserNotFoundError } from './user.common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('register')
  async createUser(@Body() data: CreateUserDto) {
    try {
      const user = await this.usersService.create(data);
      if (!user) return { msg: 'unable to create user' };
      console.log(user);
      return { msg: 'Create user successfully!!!' };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Auth Required : true
  @Post('guideVerify')
  submitGuideVerification() {
    return { msg: 'submission sent' };
  }

  // Auth Required : true, Access Control : owner
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
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Patch('test')
  async editUserProfileMock(@Req() req, @Body() data: UpdateUserRequest) {
    try {
      if (req.account.userId === 100) {
        this.usersService.updateUser(req.account.userId, data);
      }
    } catch (e) {
      throw new HttpException(
        { message: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
