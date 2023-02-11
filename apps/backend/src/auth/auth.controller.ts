import { Controller, HttpStatus, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse } from './auth.dto';
import {
  InvalidAuthenticationError,
  InvalidRequestError,
} from './auth.commons';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  signIn(@Body() req: LoginRequest, @Res({ passthrough: true }) res) {
    let resBody: LoginResponse;
    let statusCode = HttpStatus.CREATED;
    try {
      resBody = this.authService.login(req);
    } catch (e) {
      if (e instanceof InvalidRequestError) {
        statusCode = HttpStatus.BAD_REQUEST;
        resBody = { message: e.message };
      } else if (e instanceof InvalidAuthenticationError) {
        statusCode = HttpStatus.UNAUTHORIZED;
        resBody = { message: e.message };
      } else {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        resBody = { message: 'internal server error' };
      }
    }
    return res.status(statusCode).send(resBody);
  }

  @Post('/sign-out')
  signOut() {}
}
