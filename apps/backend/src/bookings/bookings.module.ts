import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookingsController } from './bookings.controller';
import { BookingsRepository } from './bookings.repository';
import { BookingsService } from './bookings.service';
import { AuthModule } from '../auth/auth.module';
import { GuidesModule } from 'src/guides/guides.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [AuthModule, GuidesModule, ScheduleModule.forRoot()],
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
