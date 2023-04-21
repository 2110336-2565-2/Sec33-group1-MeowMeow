import { Module } from '@nestjs/common';
import { GuidesModule } from '../guides/guides.module';
import { PaymentModule } from '../payment/payment.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma/prisma.service';
import { BookingsController } from './bookings.controller';
import { BookingsRepository } from './bookings.repository';
import { BookingsService } from './bookings.service';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [AuthModule, GuidesModule, PaymentModule, PostsModule],
  controllers: [BookingsController],
  providers: [
    {
      provide: 'IBookingsService',
      useClass: BookingsService,
    },
    BookingsRepository,
    PrismaService,
  ],
  exports: [BookingsRepository],
})
export class BookingsModule {}
