import { User } from 'database';
import * as bcrypt from 'bcrypt';
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

  async login(req: LoginRequest): Promise<[LoginResponse, string, string]> {
    try {
      const user = await this.userRepo.getUserByEmail(req.email);
      const passwordMatch = await bcrypt.compare(
        req.password,
        user.hashPassword,
      );
      if (!passwordMatch) {
        throw new InvalidAuthenticationError('invalid email or password');
      }
      return [{ message: 'success' }, null, null];
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new InvalidRequestError('invalid email or password');
      }
      throw e;
    }
  }

  async validate(credential: string): Promise<AccountMetadata> {
    return null;
  }
}
