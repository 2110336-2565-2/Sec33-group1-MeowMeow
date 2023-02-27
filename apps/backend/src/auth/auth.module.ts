import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { AuthServiceImpl } from './auth.service';
import { UsersRepository } from 'src/users/users.repository';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AuthService',
      useClass: AuthServiceImpl,
    },
    AuthGuard,
    UsersRepository,
    PrismaService,
  ],
})
export class AuthModule {}
