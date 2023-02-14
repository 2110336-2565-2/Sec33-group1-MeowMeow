import { Injectable } from '@nestjs/common';
import { Prisma } from 'database';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserRequest, UpdateUserResponse } from './dto/updateProfile.dto';
import { UserNotFoundError } from './user.common';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          createdAt: new Date(),
          email: createUserDto.email,
          username: createUserDto.username,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          hashPassword: createUserDto.password,
          role: 'USER',
        },
      });
      return user;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          e.message = `There is a unique constraint violation, ${e.meta.target} have already been used`;
          console.log(e.message);
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
      console.log(updates);
      const user = await this.prisma.user.update({
        where: { id: id },
        data: updates,
      });
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
          throw new UserNotFoundError('user with given id not found');
        }
      }
      throw e;
    }
  }
}
