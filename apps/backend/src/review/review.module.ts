import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewController } from './review.controller';
import { ReviewServiceImpl } from './review.service';
import { Module } from '@nestjs/common';
import { ReviewRepository } from './review.repository';

@Module({
  controllers: [ReviewController],
  providers: [
    {
      provide: 'ReviewService',
      useClass: ReviewServiceImpl,
    },
    ReviewRepository,
    PrismaService,
  ],
})
export class ReviewModule {}
