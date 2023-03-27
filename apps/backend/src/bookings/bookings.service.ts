import { Injectable } from '@nestjs/common';
import {
  AcceptBookingResponse,
  CreateBookingRequest,
  CreateBookingResponse,
  DeclineBookingResponse,
  GetBookingsByUserIdRequest,
  GetBookingsByUserIdResponse,
} from 'types';
import { BookingsRepository } from './bookings.repository';
import { InvalidDateFormat } from './bookings.common';

export interface IBookingsService {
  acceptBookingByGuide(
    id: number,
    guideId: number,
  ): Promise<AcceptBookingResponse>;
  declineBookingByGuide(
    id: number,
    guideId: number,
  ): Promise<DeclineBookingResponse>;
  getBookingsByUserId(
    req: GetBookingsByUserIdRequest,
  ): Promise<GetBookingsByUserIdResponse>;
  createBooking(req: CreateBookingRequest): Promise<CreateBookingResponse>;
}

@Injectable()
export class BookingsService implements IBookingsService {
  constructor(private readonly bookingsRepo: BookingsRepository) {}

  async getBookingsByUserId(
    req: GetBookingsByUserIdRequest,
  ): Promise<GetBookingsByUserIdResponse> {
    const bookings = await this.bookingsRepo.paginateBookings({
      offset: 0,
      limit: 100000,
      userId: req.userId,
    });

    const results = [];
    for (let i = 0; i < bookings.length; i++) {
      const booking = bookings[i];
      results.push({
        id: booking.id,
        startDate: booking.startDate,
        endDate: booking.endDate,
        bookingStatus: booking.bookingStatus,
        postId: booking.postId,
      });
    }
    return {
      results: results,
    };
  }

  async createBooking(
    req: CreateBookingRequest,
  ): Promise<CreateBookingResponse> {
    if (isNaN(Date.parse(req.startDate))) {
      throw new InvalidDateFormat("invalid 'stardDate' format");
    }
    if (isNaN(Date.parse(req.endDate))) {
      throw new InvalidDateFormat("invalid 'endDate' format");
    }

    const booking = await this.bookingsRepo.createBooking({
      userId: req.userId,
      postId: req.postId,
      guideId: req.guideId,
      startDate: new Date(req.startDate),
      endDate: new Date(req.endDate),
      bookingStatus: 'pending',
    });

    return {
      id: booking.id,
      userId: booking.userId,
      postId: booking.postId,
      startDate: booking.startDate.toString(),
      endDate: booking.endDate.toString(),
      bookingStatus: booking.bookingStatus,
    };
  }

  async acceptBookingByGuide(
    id: number,
    guideId: number,
  ): Promise<AcceptBookingResponse> {
    const booking = await this.bookingsRepo.updateBookingStatus(id, 'hello');
    return {
      id: booking.id,
      bookingStatus: booking.bookingStatus,
    };
  }

  async declineBookingByGuide(
    id: number,
    guideId: number,
  ): Promise<DeclineBookingResponse> {
    const booking = await this.bookingsRepo.updateBookingStatus(id, 'hello');
    return {
      id: booking.id,
      bookingStatus: booking.bookingStatus,
    };
  }
}
