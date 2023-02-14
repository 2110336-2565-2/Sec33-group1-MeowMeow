import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthMiddleware } from '../common/middleware/auth.middleware';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthServiceMock } from 'src/auth/auth.service.mock';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    {
      provide: 'AuthService',
      useClass: AuthServiceMock,
    },
    UsersService,
    PrismaService,
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/users/**', method: RequestMethod.ALL });
  }
}
