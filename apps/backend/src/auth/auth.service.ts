import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { InvalidAuthenticationError } from './auth.commons';
import { LoginRequest, LoginResponse, AccountMetadata } from 'types';

import { Injectable } from '@nestjs/common';
import { UserNotFoundError } from 'src/users/users.common';
import { UsersRepository } from 'src/users/users.repository';
import { backendConfig } from 'config';

export interface AuthService {
  login(req: LoginRequest): Promise<[LoginResponse, string, string]>;
  validate(credential: string): Promise<AccountMetadata>;
  refresh(refreshToken: string): Promise<[string, string]>;
}

@Injectable()
export class AuthServiceImpl {
  private jwt_secret: string;
  private accessTokenExpire: number;
  private refreshTokenExpire: number;

  constructor(private readonly usersRepo: UsersRepository) {
    this.jwt_secret = backendConfig.jwt.secret;
    this.accessTokenExpire = backendConfig.jwt.expire;
    this.refreshTokenExpire = backendConfig.jwt.refreshExpire;
  }

  async login(req: LoginRequest): Promise<[LoginResponse, string, string]> {
    const user = await this.usersRepo.getUserByEmail(req.email);
    if (!user) {
      throw new UserNotFoundError('user with given email not found');
    }

    const passwordMatch = await bcrypt.compare(
      req.password,
      user.hashedPassword,
    );
    if (!passwordMatch) {
      throw new InvalidAuthenticationError('invalid email or password');
    }

    const account: AccountMetadata = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };

    const accessToken = await this.issueAccessToken(account);
    const refreshToken = await this.issueRefreshToken(account);
    const resp = {
      message: 'success',
      userId: user.id,
      username: user.username,
      role: user.role,
    };
    return [resp, accessToken, refreshToken];
  }

  async validate(credential: string): Promise<AccountMetadata> {
    const account = this.decodeToken(credential);
    return account;
  }

  async refresh(refreshToken: string): Promise<[string, string]> {
    const account = await this.decodeToken(refreshToken);
    const user = await this.usersRepo.getUserById(account.userId);

    const newAccount: AccountMetadata = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };
    const newAccessToken = await this.issueAccessToken(newAccount);
    const newRefreshToken = await this.issueRefreshToken(newAccount);

    return [newAccessToken, newRefreshToken];
  }

  private async decodeToken(token: string): Promise<AccountMetadata> {
    try {
      const decoded = jwt.verify(token, this.jwt_secret) as jwt.JwtPayload;
      const account: AccountMetadata = {
        userId: decoded.userId,
        username: decoded.username,
        role: decoded.role,
      };

      return account;
    } catch (e) {
      throw new InvalidAuthenticationError('invalid credentials');
    }
  }

  private async issueAccessToken(account: AccountMetadata): Promise<string> {
    return jwt.sign(account, this.jwt_secret, {
      expiresIn: this.accessTokenExpire,
    });
  }

  private async issueRefreshToken(account: AccountMetadata): Promise<string> {
    return jwt.sign(account, this.jwt_secret, {
      expiresIn: this.refreshTokenExpire,
    });
  }
}
