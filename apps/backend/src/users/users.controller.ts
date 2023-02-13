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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { Request } from 'express';

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
  async editUserProfile(@Body() data: UpdateProfileDto) {
    try {
    } catch (e) {}
    return { msg: 'edit profile successfully' };
  }
  @Patch('test')
  async editUserProfileMock(@Req() req, @Body() data: UpdateProfileDto) {
    try {
      if (req.account.userId === 100) {
        this.usersService.updateProfile(req.account.userId, data);
      }
    } catch (e) {
      throw new HttpException(
        { message: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
