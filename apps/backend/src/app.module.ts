import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { GuidesModule } from './guide/guides.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [AuthModule, UsersModule, GuidesModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
