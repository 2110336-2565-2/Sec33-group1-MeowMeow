import { PrismaService } from '../prisma/prisma.service';
import { ReviewsController } from './reviews.controller';
import { ReviewsServiceImpl } from './reviews.service';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { AuthMiddleware } from '../common/middleware/auth.middleware';
import { AuthServiceImpl } from '../auth/auth.service';
import { UsersRepository } from '../users/users.repository';

@Module({
  controllers: [ReviewsController],
  providers: [
    {
      provide: 'ReviewsService',
      useClass: ReviewsServiceImpl,
    },
    {
      provide: 'AuthService',
      useClass: AuthServiceImpl,
    },
    UsersRepository,
    ReviewsRepository,
    PrismaService,
  ],
  exports: ['ReviewsService'],
})
export class ReviewsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/reviews/**', method: RequestMethod.ALL });
  }
}
