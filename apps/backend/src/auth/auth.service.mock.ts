import { InvalidAuthenticationError } from './auth.commons';
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

  async validate(credential: string): Promise<AccountMetadata> {
    if (!credential) {
      throw new InvalidAuthenticationError('missing credential');
    }

    if (credential !== 'xxxx') {
      throw new InvalidAuthenticationError('invalid credentials');
    }

    return {
      userId: 100,
      username: 'david',
      role: 'admin',
    };
  }

  async refresh(refreshToken: string): Promise<[string, string]> {
    if (refreshToken !== 'rrrr') {
      throw new InvalidAuthenticationError('invalid refresh token');
    }

    return ['xxxx', 'rrrr'];
  }
}
