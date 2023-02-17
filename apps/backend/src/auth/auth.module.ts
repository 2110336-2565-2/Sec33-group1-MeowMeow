import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { AuthServiceImpl } from './auth.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AuthService',
      useClass: AuthServiceImpl,
    },
    UserRepository,
    PrismaService,
  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/sign-in', method: RequestMethod.POST },
        { path: 'auth/refresh', method: RequestMethod.POST },
      )
      .forRoutes({ path: '/auth/**', method: RequestMethod.ALL });
  }
}
