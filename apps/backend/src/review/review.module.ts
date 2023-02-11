import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewController } from './review.controller';
import { ReviewService } from './service/review/review.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService],
})
export class ReviewModule {}
