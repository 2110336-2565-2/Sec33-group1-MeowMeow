import { Injectable } from '@nestjs/common';
import { Prisma } from 'database';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserRequest, CreateUserResponse } from './dto/createUser.dto';
import { UpdateUserRequest, UpdateUserResponse } from './dto/updateProfile.dto';
import { PropertyAlreadyUsedError, UserNotFoundError } from './user.common';
import { GetUserByIdRequest, GetUserByIdResponse } from './dto/getUserById.dto';

@Injectable()
export class UsersService {
  private hashRound: number;
  constructor(private prisma: PrismaService) {
    this.hashRound = 10;
  }

  async getUserById(req: GetUserByIdRequest): Promise<GetUserByIdResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(req.id) },
    });

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
    try {
      const hashPassword = await bcrypt.hash(
        createUserDto.password,
        this.hashRound,
      );
      const user = await this.prisma.user.create({
        data: {
          createdAt: new Date(),
          email: createUserDto.email,
          username: createUserDto.username,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          hashPassword: hashPassword,
          role: 'USER',
        },
      });

      return {
        message: 'success',
        id: user.id,
        username: user.username,
        role: user.role,
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new PropertyAlreadyUsedError(
            `There is a unique constraint violation, ${e.meta.target} have already been used`,
          );
        }
      }
      throw e;
    }
  }

  async updateUser(
    id: number,
    updates: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    try {
      const user = await this.prisma.user.update({
        where: { id: id },
        data: updates,
      });

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
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new PropertyAlreadyUsedError(
            `There is a unique constraint violation, ${e.meta.target} have already been used`,
          );
        }
      }
      throw e;
    }
  }
}
