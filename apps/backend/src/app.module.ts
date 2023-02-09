import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ReviewService } from './review/service/review/review.service';
import { GuidesController } from './guides/guides.controller';

@Module({
  imports: [],
  controllers: [AppController, GuidesController],
  providers: [AppService, PrismaService, ReviewService],
})
export class AppModule {}
