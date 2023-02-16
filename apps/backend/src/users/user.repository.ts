import { User } from 'database';
import { Prisma } from 'database';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    return user;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id: id },
    });

    return user;
  }
}
