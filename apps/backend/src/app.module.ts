import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GuidesModule } from './guides/guides.module';
import { ReviewModule } from './reviews/reviews.module';

@Module({
  imports: [AuthModule, UsersModule, GuidesModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
