import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GuidesController } from './guides.controller';
import { GuidesServiceImpl } from './guides.service';
import { GuidesRepository } from './guides.repository';
import { AuthMiddleware } from '../common/middleware/auth.middleware';
import { AuthServiceImpl } from '../auth/auth.service';
import { UsersRepository } from '../users/users.repository';
import { ReviewsModule } from '../reviews/reviews.module';
import { MediaModule } from '../media/media.module';

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
  imports: [ReviewsModule, MediaModule],
})
export class GuidesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/guides/**', method: RequestMethod.ALL });
  }
}
