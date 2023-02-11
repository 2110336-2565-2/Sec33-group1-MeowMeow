import {
  InvalidAuthenticationError,
  InvalidRequestError,
} from './auth.commons';
import { LoginRequest, LoginResponse } from './auth.dto';

import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(req: LoginRequest): LoginResponse {
    if (req.email != 'test@gmail.com' || req.password != '123456') {
      throw new InvalidAuthenticationError(
        'Hey dude. An email is test@gmail.com and password is 123456!',
      );
    }

    return {
      message: 'success',
      accessToken: 'xxx',
      refreshToken: 'yyy',
    };
  }
}
