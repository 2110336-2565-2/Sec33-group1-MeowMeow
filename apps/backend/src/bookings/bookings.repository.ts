import { Injectable } from '@nestjs/common';
import { BookingStatus, Prisma } from 'database';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecordNotFound } from './bookings.common';

@Injectable()
export class BookingsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async updateBookingStatus(id: number, bookingStatus: BookingStatus) {
    try {
      const result = await this.prismaService.booking.update({
        where: { id },
        data: { bookingStatus },
        select: {
          id: true,
          bookingStatus: true,
        },
      });
      return result;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2001') {
          throw new RecordNotFound(`Booking id ${id} doesn't exist`);
        }
      }
      throw e;
    }
  }
}
