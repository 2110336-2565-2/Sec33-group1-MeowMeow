import { User } from 'database';
import { PrismaService } from 'src/prisma/prisma.service';

export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getUserByEmail(email: string): User {
    return null;
  }
}
