import { Module } from '@nestjs/common';
import { GuidesModule } from 'src/guides/guides.module';
import { PaymentModule } from 'src/payment/payment.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma/prisma.service';
import { BookingsController } from './bookings.controller';
import { BookingsRepository } from './bookings.repository';
import { BookingsService } from './bookings.service';

@Module({
  imports: [AuthModule, GuidesModule, PaymentModule],
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
