import { Injectable } from '@nestjs/common';
import { Booking, BookingStatus, Prisma } from 'database';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  FailedRelationConstraintError,
  RecordNotFound,
} from './bookings.common';

const bookingStatusEnumMapper = {
  pending: BookingStatus.PENDING,
  accepted: BookingStatus.ACCEPTED,
  rejected: BookingStatus.REJECTED,
};

@Injectable()
export class BookingsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async paginateBookings(filter: {
    offset: number;
    limit: number;
    userId: number;
  }): Promise<Booking[]> {
    const results = await this.prismaService.booking.findMany({
      where: {
        userId: filter.userId,
      },
      skip: filter.offset,
      take: filter.limit,
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          bookingStatus: 'asc', // this is a hack, needed to be fixed in the future
        },
      ],
    });
    return results;
  }

  async createBooking(data: {
    startDate: Date;
    endDate: Date;
    postId: number;
    userId: number;
    guideId: number;
    bookingStatus: string;
  }): Promise<Booking> {
    const bookingStatusEnum = bookingStatusEnumMapper[data.bookingStatus];
    if (!bookingStatusEnum) {
      throw new Error('unrecognized booking status');
    }
    try {
      const booking = await this.prismaService.booking.create({
        data: {
          startDate: data.startDate,
          endDate: data.endDate,
          postId: data.postId,
          userId: data.userId,
          guideId: data.guideId,
          bookingStatus: bookingStatusEnum,
        },
      });
      return booking;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new FailedRelationConstraintError('relation constraint failed');
        }
      }
      throw e;
    }
  }

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
