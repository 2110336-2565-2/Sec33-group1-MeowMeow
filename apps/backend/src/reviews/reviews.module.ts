import { PrismaService } from '../prisma/prisma.service';
import { ReviewsController } from './reviews.controller';
import { ReviewsServiceImpl } from './reviews.service';
import { Module } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
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
export class ReviewsModule {}
