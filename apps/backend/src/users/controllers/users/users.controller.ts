import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';

@Controller()
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

  @Get('test')
  test() {
    console.log('test');
    return { msg: 'get test successfully' };
  }
}
