import {
  Controller,
  HttpStatus,
  Post,
  Body,
  Res,
  Inject,
  HttpException,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse, LogoutRequest } from 'types';
import {
  InvalidAuthenticationError,
  InvalidRequestError,
} from './auth.commons';
import { UserNotFoundError } from 'src/users/users.common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    @Inject('AuthService') private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: 'sign in with username and password',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully signed in',
    type: LoginResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'email or password not provided',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'email invalid or password not matched',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
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
      console.log(e);
      if (e instanceof InvalidAuthenticationError) {
        throw new HttpException(
          { message: e.message },
          HttpStatus.UNAUTHORIZED,
        );
      }
      if (e instanceof UserNotFoundError) {
        throw new HttpException(
          { message: e.message },
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw new HttpException(
        { message: 'internal server error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiCookieAuth('refresh_token')
  @ApiOperation({
    summary: 'issue new access token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully refresh credential',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'refresh token not provided',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'refresh token invalid or time out',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @Post('refresh')
  async refresh(@Req() req, @Res({ passthrough: true }) res) {
    try {
      const refreshToken: string = req.cookies['refresh_token'];
      const [newAccessToken, newRefreshToken] = await this.authService.refresh(
        refreshToken,
      );
      res.cookie('access_token', newAccessToken, {
        sameSite: 'strict',
        httpOnly: true,
      });
      res.cookie('refresh_token', newRefreshToken, {
        sameSite: 'strict',
        httpOnly: true,
      });
    } catch (e) {
      console.log(e);
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

  @ApiCookieAuth('access_token')
  @ApiCookieAuth('refresh_token')
  @ApiOperation({
    summary: 'sign out',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'successfully signed out',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'access token not provided',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @Post('sign-out')
  async signOut(@Body() req: LogoutRequest, @Res({ passthrough: true }) res) {
    try {
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      res.status(HttpStatus.NO_CONTENT).send({ message: 'success' });
    } catch (e) {
      throw new HttpException(
        { message: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
