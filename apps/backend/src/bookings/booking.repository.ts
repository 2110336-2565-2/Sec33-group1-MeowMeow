import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Booking, BookingStatus } from 'database';

const bookingStatusEnumMapper = {
  pending: BookingStatus.PENDING,
  accepted: BookingStatus.ACCEPTED,
  rejected: BookingStatus.REJECTED,
};

@Injectable()
export class BookingRepository {
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
      orderBy: {
        createdAt: 'desc',
        bookingStatus: 'asc', // this is a hack, needed to be fixed in the future
      },
    });
    return results;
  }

  async createBooking(data: {
    startDate: Date;
    endDate: Date;
    postId: number;
    userId: number;
    bookingStatus: string;
  }): Promise<Booking> {
    const bookingStatusEnum = bookingStatusEnumMapper[data.bookingStatus];
    if (!bookingStatusEnum) {
      throw new Error('unrecognized booking status');
    }
    const booking = await this.prismaService.booking.create({
      data: {
        startDate: data.startDate,
        endDate: data.endDate,
        postId: data.postId,
        userId: data.userId,
        guideId: 0,
        bookingStatus: bookingStatusEnum,
      },
    });
    return booking;
  }

  async updateBookingById(
    id: number,
    data: {
      bookingStatus: string;
    },
  ): Promise<Booking> {
    const bookingStatusEnum = bookingStatusEnumMapper[data.bookingStatus];
    if (!bookingStatusEnum) {
      throw new Error('unrecognized booking status');
    }

    const booking = await this.prismaService.booking.update({
      where: {
        id: id,
      },
      data: {
        bookingStatus: bookingStatusEnum,
      },
    });
    return booking;
  }
}
