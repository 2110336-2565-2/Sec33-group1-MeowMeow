import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';

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
    } catch (err) {
      console.log(err);
      return { msg: 'error has occurred' };
    }
  }

  // Auth Required : true
  @Post('guideVerify')
  submitGuideVerification() {
    return { msg: 'submission sent' };
  }

  // Auth Required : true, Access Control : owner
  @Put('user')
  editUserProfile() {
    return { msg: 'edit profile successfully' };
  }
}
