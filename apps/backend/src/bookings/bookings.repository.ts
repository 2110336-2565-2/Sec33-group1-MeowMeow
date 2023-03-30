import { Injectable } from '@nestjs/common';
import { Booking, BookingStatus, Prisma } from 'database';
import { PrismaService } from '../prisma/prisma.service';
import {
  FailedRelationConstraintError,
  RecordNotFound,
} from './bookings.common';

const bookingStatusEnumMapper = {
  waitingForGuideConfirmation: BookingStatus.WAITING_FOR_GUIDE_CONFIRMATION,
  guideCancelled: BookingStatus.GUIDE_CANCELLED,
  waitingForPayment: BookingStatus.WAITING_FOR_PAYMENT,
  waitingForRefund: BookingStatus.WAITING_FOR_REFUND,
  waitingForTraveling: BookingStatus.WAITING_FOR_TRAVELING,
  traveling: BookingStatus.TRAVELING,
  finished: BookingStatus.FINISHED,
  userCancelled: BookingStatus.USER_CANCELLED,
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

  async getBookingAndPostById(id: number) {
    try {
      const booking = await this.prismaService.booking.findUnique({
        where: { id },
        include: {
          post: true,
        },
      });
      return booking;
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
