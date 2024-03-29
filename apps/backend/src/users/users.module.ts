import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersController } from './users.controller';
import { UsersServiceImpl } from './users.service';
import { UsersRepository } from './users.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [
    {
      provide: 'UsersService',
      useClass: UsersServiceImpl,
    },
    UsersRepository,
    PrismaService,
  ],
})
export class UsersModule {}
