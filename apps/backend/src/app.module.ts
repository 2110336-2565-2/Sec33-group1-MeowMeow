import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ReviewService } from './review/service/review/review.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, ReviewService],
})
export class AppModule {}
