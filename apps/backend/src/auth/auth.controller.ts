import {
  Controller,
  HttpStatus,
  Post,
  Body,
  Res,
  Inject,
  HttpException,
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
  async signIn(@Body() req: LoginRequest, @Res({ passthrough: true }) res) {
    try {
      const [resBody, accessToken, refreshToken] = await this.authService.login(
        req,
      );
      res.cookie('access_token', accessToken, {
        sameSite: 'strict',
        httpOnly: true,
      });
      res.cookie('refresh_token', refreshToken, {
        sameSite: 'strict',
        httpOnly: true,
      });
      res.status(HttpStatus.CREATED).send(resBody);
    } catch (e) {
      if (e instanceof InvalidRequestError) {
        throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST);
      }
      if (e instanceof InvalidAuthenticationError) {
        throw new HttpException(
          { message: e.message },
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw new HttpException(
        { message: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('sign-out')
  async signOut(@Body() req: LogoutRequest, @Res({ passthrough: true }) res) {
    try {
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      res.status(HttpStatus.NO_CONTENT).send({ message: 'success' });
    } catch (e) {
      if (e instanceof InvalidRequestError) {
        throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        { message: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
