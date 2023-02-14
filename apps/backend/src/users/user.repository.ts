import { User } from 'database';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserNotFoundError } from './user.common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new UserNotFoundError('user with given email not found');
    }

    return user;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new UserNotFoundError('user with given email not found');
    }

    return user;
  }
}
