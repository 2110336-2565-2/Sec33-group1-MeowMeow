import { Role, User } from 'database';
import { Prisma } from 'database';
import { PrismaService } from '../prisma/prisma.service';
import { PropertyAlreadyUsedError, UserNotFoundError } from './users.common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  handleException(e: Error) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        throw new PropertyAlreadyUsedError(
          `There is a unique constraint violation, ${e.meta.target} have already been used`,
        );
      }
    }
    throw e;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    return user;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    return user;
  }

  async createUser(data: {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    hashedPassword: string;
    roles: Role[];
  }): Promise<User> {
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: data.email,
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          hashedPassword: data.hashedPassword,
          roles: data.roles,
        },
      });

      return user;
    } catch (e) {
      this.handleException(e);
    }
  }

  async updateUserById(
    id: number,
    update: {
      email?: string;
      username?: string;
      firstName?: string;
      lastName?: string;
      hashedPassword?: string;
      imageId?: string;
    },
  ): Promise<User> {
    try {
      const user = await this.prismaService.user.update({
        where: { id: id },
        data: {
          email: update.email,
          username: update.username,
          firstName: update.firstName,
          lastName: update.lastName,
          hashedPassword: update.hashedPassword,
          imageId: update.imageId,
        },
      });

      return user;
    } catch (e) {
      this.handleException(e);
    }
  }

  async addUserRole(id: number, role: Role): Promise<User> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) throw new UserNotFoundError('updated user not found');

      if (user.roles.includes(role))
        throw new PropertyAlreadyUsedError('user role already existed');

      user.roles.push(role);
      return await this.prismaService.user.update({
        where: { id: id },
        data: {
          roles: user.roles,
        },
      });
    } catch (e) {
      this.handleException(e);
    }
  }
}
