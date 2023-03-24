import { AuthService } from '../../auth/auth.service';

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
import {
  InvalidAuthenticationError,
  InvalidRequestError,
} from '../../auth/auth.commons';

export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject('AuthService') private readonly authService: AuthService,
  ) {}

  async use(@Req() req, @Res({ passthrough: true }) res, @Next() next) {
    const accessToken: string = req.cookies['access_token'];
    try {
      const accountMetadata = await this.authService.validate(accessToken);
      req.account = accountMetadata;
      next();
    } catch (e) {
      if (e instanceof InvalidRequestError) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      }
      if (e instanceof InvalidAuthenticationError) {
        throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
