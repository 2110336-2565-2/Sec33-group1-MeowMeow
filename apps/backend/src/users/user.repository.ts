import { User } from 'database';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserNotFoundError } from './user.common';

export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: {
          email: email,
        },
      });
      return user;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2016') {
          throw new UserNotFoundError('user with given email does not exist');
        }
      }
      throw new e();
    }
  }
}
