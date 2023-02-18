import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GuidesController } from './guides.controller';
import { GuidesServiceImpl, GuidesService } from './guides.service';
import { GuidesRepository } from './guides.repository';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { AuthServiceImpl } from 'src/auth/auth.service';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  controllers: [GuidesController],
  providers: [
    {
      provide: 'GuidesService',
      useClass: GuidesServiceImpl,
    },
    {
      provide: 'AuthService',
      useClass: AuthServiceImpl,
    },
    UsersRepository,
    GuidesRepository,
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
