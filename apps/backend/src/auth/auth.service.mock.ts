import {
  InvalidAuthenticationError,
  InvalidRequestError,
} from './auth.commons';
import { AccountMetadata, LoginRequest, LoginResponse } from './auth.dto';

import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthServiceMock {
  async login(req: LoginRequest): Promise<[LoginResponse, string, string]> {
    if (req.email !== 'test@gmail.com' || req.password !== '123456') {
      throw new InvalidAuthenticationError(
        'Hey dude. An email is test@gmail.com and password is 123456',
      );
    }

    return [{ message: 'success' }, 'xxxx', 'rrrr'];
  }

  validate(credential: string): AccountMetadata {
    if (!credential) {
      throw new InvalidRequestError('missing credential');
    }
    if (credential !== 'xxxx') {
      throw new InvalidAuthenticationError('');
    }

    return {
      userId: 100,
      role: 'admin',
    };
  }
}
