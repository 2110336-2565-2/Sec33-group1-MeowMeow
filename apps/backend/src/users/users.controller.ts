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
  UseGuards,
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

  @UseGuards(AuthGuard)
  @Get('/profiles')
  async getUserProfile(@Req() req, @Res({ passthrough: true }) res) {
    try {
      const account: AccountMetadata = req.account;
      const resBody = await this.usersService.getUserById({
        id: account.userId,
      });
      res.status(HttpStatus.OK).send(resBody);
    } catch (e) {
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:id')
  async getUserById(
    @Param('id', ParseIntPipe) userId: number,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const resBody = await this.usersService.getUserById({ id: userId });
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

  @Post('/register')
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

  @UseGuards(AuthGuard)
  @Put('/users')
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
