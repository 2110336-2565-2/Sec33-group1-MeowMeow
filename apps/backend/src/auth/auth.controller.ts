import {
  Controller,
  HttpStatus,
  Post,
  Body,
  Res,
  Inject,
} from '@nestjs/common';
import { AuthService, AuthServiceImpl } from './auth.service';
import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
} from './auth.dto';
import {
  InvalidAuthenticationError,
  InvalidRequestError,
} from './auth.commons';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    @Inject('AuthService') private readonly authService: AuthService,
  ) {}

  @Post('sign-in')
  signIn(@Body() req: LoginRequest, @Res({ passthrough: true }) res) {
    let resBody: LoginResponse;
    let statusCode = HttpStatus.CREATED;
    try {
      let accessToken: string, refreshToken: string;
      [resBody, accessToken, refreshToken] = this.authService.login(req);
      res.cookie('access_token', accessToken, {
        sameSite: 'strict',
        httpOnly: true,
      });
      res.cookie('refresh_token', refreshToken, {
        sameSite: 'strict',
        httpOnly: true,
      });
    } catch (e) {
      console.log(e);
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
    res.status(statusCode).send(resBody);
  }

  @Post('sign-out')
  signOut(@Body() req: LogoutRequest, @Res({ passthrough: true }) res) {
    let resBody: LogoutResponse;
    let statusCode = HttpStatus.CREATED;
    try {
      resBody = { message: 'success' };
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
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
}
