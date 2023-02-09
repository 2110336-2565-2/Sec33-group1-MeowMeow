import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './controllers/users/users.controller';

@Module({
  controllers: [UsersController],
  imports: [PrismaModule],
})
export class UsersModule {}
