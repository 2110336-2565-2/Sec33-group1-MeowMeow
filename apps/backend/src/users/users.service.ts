import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserRequest, CreateUserResponse } from './dtos/createUser.dto';
import {
  GetUserByIdRequest,
  GetUserByIdResponse,
} from './dtos/getUserById.dto';
import {
  UpdateUserRequest,
  UpdateUserResponse,
} from './dtos/updateProfile.dto';
import { UserNotFoundError } from './users.common';
import { backendConfig } from 'config';
import { UsersRepository } from './users.repository';

export interface UsersService {
  getUserById(req: GetUserByIdRequest): Promise<GetUserByIdResponse>;
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
    this.hashRound = backendConfig.bcrypt.salt;
  }

  async getUserById(req: GetUserByIdRequest): Promise<GetUserByIdResponse> {
    const user = await this.usersRepo.getUserById(req.id);
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
    };
  }

  async create(req: CreateUserRequest): Promise<CreateUserResponse> {
    const hashPassword = await bcrypt.hash(req.password, this.hashRound);

    const user = await this.usersRepo.createUser({
      createdAt: new Date(),
      email: req.email,
      username: req.username,
      firstName: req.firstName,
      lastName: req.lastName,
      hashPassword: hashPassword,
      role: 'USER',
    });

    return {
      message: 'success',
      id: user.id,
      username: user.username,
      role: user.role,
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
    };
  }
}
