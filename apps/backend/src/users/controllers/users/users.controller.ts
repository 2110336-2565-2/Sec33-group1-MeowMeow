import { Body, Controller, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('register')
  async createUser(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
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
