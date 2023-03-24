import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GuidesController } from './guides.controller';
import { GuidesServiceImpl } from './guides.service';
import { GuidesRepository } from './guides.repository';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { AuthServiceImpl } from 'src/auth/auth.service';
import { UsersRepository } from 'src/users/users.repository';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { MediaServiceImpl } from 'src/media/media.service';
import { MediaModule } from 'src/media/media.module';

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
