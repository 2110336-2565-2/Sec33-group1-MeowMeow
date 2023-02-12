import { AuthService } from 'src/auth/auth.service';

import {
  Req,
  Res,
  Next,
  Injectable,
  NestMiddleware,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AccountMetadata } from 'src/auth/auth.dto';
import {
  InvalidAuthenticationError,
  InvalidRequestError,
} from 'src/auth/auth.commons';

export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject('AuthService') private readonly authService: AuthService,
  ) {}

  async use(@Req() req, @Res({ passthrough: true }) res, @Next() next) {
    const accessToken: string = req.cookies['access_token'];
    const refreshToken: string = req.cookies['refresn_token'];
    try {
      const accountMetadata: AccountMetadata =
        this.authService.validate(accessToken);
      req.account = accountMetadata;
      next();
    } catch (e) {
      if (e instanceof InvalidRequestError) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      }
      if (e instanceof InvalidAuthenticationError) {
        throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
