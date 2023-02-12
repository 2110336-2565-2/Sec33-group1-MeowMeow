import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthServiceMock } from './auth.service.mock';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AuthService',
      useClass: AuthServiceMock,
    },
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
      .forRoutes({ path: '/**', method: RequestMethod.ALL });
  }
}
