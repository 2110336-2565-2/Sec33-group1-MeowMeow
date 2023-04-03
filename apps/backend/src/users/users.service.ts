import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  GetUserByIdResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  CreateUserRequest,
  CreateUserResponse,
} from 'types';
import { UserNotFoundError } from './users.common';
import { backendConfig } from 'config';
import { UsersRepository } from './users.repository';
import { Role } from 'database';

export interface UsersService {
  getUserById(id: number): Promise<GetUserByIdResponse>;
  create(req: CreateUserRequest): Promise<CreateUserResponse>;
  updateUser(
    id: number,
    updates: UpdateUserRequest,
  ): Promise<UpdateUserResponse>;
}

@Injectable()
export class UsersServiceImpl {
  private hashRound: number;

  constructor(private readonly usersRepo: UsersRepository) {
    this.hashRound = backendConfig.bcrypt.hashRound;
  }

  async getUserById(id: number): Promise<GetUserByIdResponse> {
    const user = await this.usersRepo.getUserById(id);
    if (!user) {
      throw new UserNotFoundError('user with given id not found');
    }

    return {
      message: 'success',
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
    };
  }

  async create(req: CreateUserRequest): Promise<CreateUserResponse> {
    const hashedPassword = await bcrypt.hash(req.password, this.hashRound);

    const user = await this.usersRepo.createUser({
      email: req.email,
      username: req.username,
      firstName: req.firstName,
      lastName: req.lastName,
      hashedPassword: hashedPassword,
      roles: [Role.USER],
    });

    return {
      message: 'success',
      id: user.id,
      username: user.username,
    };
  }

  async updateUser(
    id: number,
    updates: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    const user = await this.usersRepo.updateUserById(id, updates);
    if (!user) {
      throw new UserNotFoundError('user with given id not found');
    }

    return {
      message: 'success',
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      imageId: user.imageId,
    };
  }
}
