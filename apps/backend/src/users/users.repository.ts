import { Role, User } from 'database';
import { Prisma } from 'database';
import { PrismaService } from 'src/prisma/prisma.service';
import { PropertyAlreadyUsedError } from './users.common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

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
    createdAt: Date;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    hashedPassword: string;
    role: Role;
  }): Promise<User> {
    try {
      const user = await this.prismaService.user.create({
        data: {
          createdAt: data.createdAt,
          email: data.email,
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          hashedPassword: data.hashedPassword,
          role: data.role,
        },
      });

      return user;
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

  async updateUserById(
    id: number,
    update: {
      email?: string;
      username?: string;
      firstName?: string;
      lastName?: string;
      hashedPassword?: string;
      role?: Role;
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
          role: update.role,
        },
      });

      return user;
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
