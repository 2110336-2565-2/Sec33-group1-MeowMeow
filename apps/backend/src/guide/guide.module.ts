import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GuidesController } from './guide.controller';
import { GuideServiceImpl, GuideService } from './guide.service';
import { GuideRepository } from './guide.repository';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { AuthServiceImpl } from 'src/auth/auth.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
  controllers: [GuidesController],
  providers: [
    {
      provide: 'GuideService',
      useClass: GuideServiceImpl,
    },
    {
      provide: 'AuthService',
      useClass: AuthServiceImpl,
    },
    UserRepository,
    GuideRepository,
    PrismaService,
  ],
})
export class GuidesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/guides/**', method: RequestMethod.ALL });
  }
}
