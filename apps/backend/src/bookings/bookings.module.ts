import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma/prisma.service';
import { BookingsController } from './bookings.controller';
import { BookingsRepository } from './bookings.repository';
import { BookingsService } from './bookings.service';

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
  exports: [BookingsRepository],
})
export class BookingsModule {}
