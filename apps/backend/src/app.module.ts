import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthServiceImpl } from './auth/auth.service';
import { BookingsModule } from './bookings/bookings.module';
import { GuidesModule } from './guides/guides.module';
import { MediaModule } from './media/media.module';
import { PaymentModule } from './payment/payment.module';
import { PostsModule } from './posts/posts.module';
import { PrismaService } from './prisma/prisma.service';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
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
    PaymentModule,
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
