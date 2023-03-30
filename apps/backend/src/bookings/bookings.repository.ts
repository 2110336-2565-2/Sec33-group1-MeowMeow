import { Injectable } from '@nestjs/common';
import { Booking, BookingStatus, Prisma } from 'database';
import { PrismaService } from '../prisma/prisma.service';
import {
  FailedRelationConstraintError,
  RecordNotFound,
} from './bookings.common';

const bookingStatusEnumMapper = {
  WAITING_FOR_GUIDE_CONFIRMATION: BookingStatus.WAITING_FOR_GUIDE_CONFIRMATION,
  GUIDE_CANCELLED: BookingStatus.GUIDE_CANCELLED,
  WAITING_FOR_PAYMENT: BookingStatus.WAITING_FOR_PAYMENT,
  WAITING_FOR_REFUND: BookingStatus.WAITING_FOR_REFUND,
  WAITING_FOR_TRAVELING: BookingStatus.WAITING_FOR_TRAVELING,
  TRAVELING: BookingStatus.TRAVELING,
  FINISHED: BookingStatus.FINISHED,
  USER_CANCELLED: BookingStatus.USER_CANCELLED,
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

  async getBookingById(id: number): Promise<{
    id: number;
    updatedAt: Date;
    startDate: Date;
    endDate: Date;
    postId: number;
    userId: number;
    guideId: number;
    bookingStatus: string;
  }> {
    const booking = await this.prismaService.booking.findFirst({
      where: {
        id: id,
      },
    });
    if (!booking) {
      throw new RecordNotFound(`booking with id ${id} no found`);
    }

    return {
      id: booking.id,
      updatedAt: booking.updatedAt,
      startDate: booking.startDate,
      endDate: booking.endDate,
      postId: booking.postId,
      userId: booking.userId,
      guideId: booking.guideId,
      bookingStatus: booking.bookingStatus.toString(),
    };
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

  async updateBookingStatus(id: number, bookingStatus: string) {
    try {
      const bookingStatusEnum: BookingStatus =
        bookingStatusEnumMapper[bookingStatus];
      const result = await this.prismaService.booking.update({
        where: { id },
        data: { bookingStatus: bookingStatusEnum },
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
