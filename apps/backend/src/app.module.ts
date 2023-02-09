import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';


import { ReviewService } from './review/service/review/review.service';
import { GuidesController } from './guides/guides.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, GuidesController],
  providers: [AppService, PrismaService, ReviewService],
})
export class AppModule {}
