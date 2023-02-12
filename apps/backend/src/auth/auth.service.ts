import { User } from 'database';
import {
  InvalidAuthenticationError,
  InvalidRequestError,
} from './auth.commons';
import { LoginRequest, LoginResponse, AccountMetadata } from './auth.dto';

import { Injectable } from '@nestjs/common';

export interface UserRepository {
  getUserByEmail(email: string): Promise<User>;
}

export interface AuthService {
  login(req: LoginRequest): Promise<[LoginResponse, string, string]>;
  validate(credential: string): Promise<AccountMetadata>;
  refresh(refreshToken: string): Promise<[string, string]>;
}

@Injectable()
export class AuthServiceImpl {
  constructor(private readonly userRepo: UserRepository) {}

  login(req: LoginRequest): [LoginResponse, string, string] {
    return [{ message: 'not implemented' }, null, null];
  }

  validate(credential: string): AccountMetadata {
    return null;
  }
}
