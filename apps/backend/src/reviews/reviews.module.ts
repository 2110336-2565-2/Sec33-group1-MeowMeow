import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewController } from './reviews.controller';
import { ReviewServiceImpl } from './reviews.service';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ReviewRepository } from './reviews.repository';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { AuthServiceImpl } from 'src/auth/auth.service';
import { UserRepository } from 'src/users/users.repository';

@Module({
  controllers: [ReviewController],
  providers: [
    {
      provide: 'ReviewService',
      useClass: ReviewServiceImpl,
    },
    {
      provide: 'AuthService',
      useClass: AuthServiceImpl,
    },
    UserRepository,
    ReviewRepository,
    PrismaService,
  ],
})
export class ReviewModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/reviews/**', method: RequestMethod.ALL });
  }
}
