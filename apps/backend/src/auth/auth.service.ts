import {
  InvalidAuthenticationError,
  InvalidRequestError,
} from './auth.commons';
import { LoginRequest, LoginResponse, AccountMetadata } from './auth.dto';

import { Injectable } from '@nestjs/common';

export interface UserRepository {
  getUserByEmail(email: string);
}

export interface AuthService {
  login(req: LoginRequest): [LoginResponse, string, string];
  validate(credential: string): AccountMetadata;
}

@Injectable()
export class AuthServiceImpl {
  login(req: LoginRequest): [LoginResponse, string, string] {
    return [{ message: 'not implemented' }, null, null];
  }

  validate(credential: string): AccountMetadata {
    return null;
  }
}
