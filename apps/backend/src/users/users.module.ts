import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthMiddleware } from '../common/middleware/auth.middleware';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthServiceImpl } from 'src/auth/auth.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    {
      provide: 'AuthService',
      useClass: AuthServiceImpl,
    },
    UsersService,
    UserRepository,
    PrismaService,
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/users/register', method: RequestMethod.POST })
      .forRoutes({ path: '/users/**', method: RequestMethod.ALL });
  }
}
