import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookingsController } from './bookings.controller';
import { BookingsRepository } from './bookings.repository';
import { BookingsService } from './bookings.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [BookingsController],
  providers: [
    {
      provide: 'IBookingsService',
      useClass: BookingsService,
    },
    BookingsRepository,
    PrismaService,
  ],
})
export class BookingsModule {}
