import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import {
  InvalidAuthenticationError,
  InvalidRequestError,
} from './auth.commons';
import { LoginRequest, LoginResponse, AccountMetadata } from './auth.dto';

import { Injectable } from '@nestjs/common';
import { UserNotFoundError } from 'src/users/user.common';
import { UserRepository } from 'src/users/user.repository';

export interface AuthService {
  login(req: LoginRequest): Promise<[LoginResponse, string, string]>;
  validate(credential: string): Promise<AccountMetadata>;
  refresh(refreshToken: string): Promise<[string, string]>;
}

@Injectable()
export class AuthServiceImpl {
  private jwt_secret: string;

  constructor(private readonly userRepo: UserRepository) {
    this.jwt_secret = '1233';
  }

  async login(req: LoginRequest): Promise<[LoginResponse, string, string]> {
    const user = await this.userRepo.getUserByEmail(req.email);
    if (!user) {
      throw new UserNotFoundError('user with given email not found');
    }

    const passwordMatch = await bcrypt.compare(req.password, user.hashPassword);
    if (!passwordMatch) {
      throw new InvalidAuthenticationError('invalid email or password');
    }

    const account = {
      id: user.id.toString(),
      username: user.username,
      role: user.role,
    };

    const accessToken = jwt.sign(account, this.jwt_secret, {
      expiresIn: 600,
    });
    const refreshToken = jwt.sign(account, this.jwt_secret, {
      expiresIn: '10 days',
    });

    return [{ message: 'success' }, accessToken, refreshToken];
  }

  async validate(credential: string): Promise<AccountMetadata> {
    try {
      const decoded = jwt.verify(credential, this.jwt_secret) as jwt.JwtPayload;
      return {
        userId: Number(decoded.id),
        role: decoded.role,
      };
    } catch (e) {
      throw new InvalidAuthenticationError('invalid credentials');
    }
  }

  async refresh(refreshToken: string): Promise<[string, string]> {
    try {
      const decoded = jwt.verify(
        refreshToken,
        this.jwt_secret,
      ) as jwt.JwtPayload;

      const user = await this.userRepo.getUserById(Number(decoded.id));

      const account = {
        id: user.id,
        usernae: user.username,
        role: user.role,
      };

      const newAccessToken = jwt.sign(account, this.jwt_secret, {
        expiresIn: 600,
      });
      const newRefreshToken = jwt.sign(account, this.jwt_secret, {
        expiresIn: '10 days',
      });

      return [newAccessToken, newRefreshToken];
    } catch (e) {
      throw new InvalidAuthenticationError('invalid credentials');
    }
  }
}
