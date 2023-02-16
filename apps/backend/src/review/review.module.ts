import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewController } from './review.controller';
import { ReviewServiceImpl } from './review.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ReviewController],
  providers: [
    {
      provide: 'ReviewService',
      useClass: ReviewServiceImpl,
    },
    PrismaService,
  ],
})
export class ReviewModule {}
