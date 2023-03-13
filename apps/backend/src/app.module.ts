import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GuidesModule } from './guides/guides.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PostsModule } from './posts/posts.module';
import { BookingsModule } from './bookings/bookings.module';
import { MediaModule } from './media/media.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AuthServiceImpl } from './auth/auth.service';
import { UsersRepository } from './users/users.repository';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    GuidesModule,
    ReviewsModule,
    PostsModule,
    BookingsModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: 'AuthService',
      useClass: AuthServiceImpl,
    },
    UsersRepository,
  ],
})
export class AppModule {}
