import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ServiceService } from './review/service/service.service';
import { ReviewService } from './review/service/review/review.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, ServiceService, ReviewService],
})
export class AppModule {}
