import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  InvalidAuthenticationError,
  InvalidRequestError,
} from '../auth/auth.commons';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('AuthService') private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const credential: string = req.cookies['access_token'];
      const account = await this.authService.validate(credential);
      req.account = account;
      return true;
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
