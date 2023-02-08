import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';

@Controller('users')
export class UsersController {
  @Post('register')
  createUser(@Body() data: CreateUserDto) {
    return { msg: 'create user successfully' };
  }
}
