import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewController } from './review.controller';
import { ReviewServiceImpl } from './review.service';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { AuthServiceImpl } from 'src/auth/auth.service';
import { UserRepository } from 'src/user/user.repository';

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
