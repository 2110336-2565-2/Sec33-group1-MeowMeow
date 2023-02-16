import { Injectable } from '@nestjs/common';
import { Prisma } from 'database';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserRequest, CreateUserResponse } from './dto/createUser.dto';
import { UpdateUserRequest, UpdateUserResponse } from './dto/updateProfile.dto';
import { PropertyAlreadyUsedError, UserNotFoundError } from './user.common';
import { GetUserByIdRequest, GetUserByIdResponse } from './dto/getUserById.dto';
import { backendConfig } from 'config';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  private hashRound: number;

  constructor(private readonly userRepo: UserRepository) {
    this.hashRound = backendConfig.bcrypt.salt;
  }

  async getUserById(req: GetUserByIdRequest): Promise<GetUserByIdResponse> {
    const user = await this.userRepo.getUserById(req.id);
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

  async create(createUserDto: CreateUserRequest): Promise<CreateUserResponse> {
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      this.hashRound,
    );

    const user = await this.userRepo.createUser({
      createdAt: new Date(),
      email: createUserDto.email,
      username: createUserDto.username,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
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
    const user = await this.userRepo.updateUserById(id, updates);
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
