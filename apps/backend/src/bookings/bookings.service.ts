import { Injectable } from '@nestjs/common';
import {
  AcceptBookingResponse,
  CreateBookingRequest,
  CreateBookingResponse,
  DeclineBookingResponse,
  GetBookingsByGuideIdRequest,
  GetBookingsByGuideIdResponse,
  GetBookingsByUserIdRequest,
  GetBookingsByUserIdResponse,
} from 'types';
import { BookingsRepository } from './bookings.repository';
import { InvalidDateFormat } from './bookings.common';
import { BookingStatus } from 'database';

export interface IBookingsService {
  acceptBookingByGuide(
    id: number,
    guideUserId: number,
  ): Promise<AcceptBookingResponse>;
  declineBookingByGuide(
    id: number,
    guideUserId: number,
  ): Promise<DeclineBookingResponse>;
  getBookingsByUserId(
    userId: number,
    queryParams: GetBookingsByUserIdRequest,
  ): Promise<GetBookingsByUserIdResponse>;
  getBookingsByGuideId(
    guideId: number,
    queryParams: GetBookingsByGuideIdRequest,
  ): Promise<GetBookingsByGuideIdResponse>;
  createBooking(req: CreateBookingRequest): Promise<CreateBookingResponse>;
}

@Injectable()
export class BookingsService implements IBookingsService {
  constructor(private readonly bookingsRepo: BookingsRepository) {}

  async getBookingsByUserId(
    userId: number,
    queryParams: GetBookingsByUserIdRequest,
  ): Promise<GetBookingsByUserIdResponse> {
    const bookings = await this.bookingsRepo.paginateBookings({
      offset: queryParams.offset,
      limit: queryParams.limit,
      userId: userId,
    });
    const results = bookings.map((booking) => ({
      id: booking.id,
      startDate: booking.startDate.toString(),
      endDate: booking.endDate.toString(),
      bookingStatus: booking.bookingStatus,
      postId: booking.postId,
    }));
    return results;
  }

  async getBookingsByGuideId(
    guideId: number,
    queryParams: GetBookingsByGuideIdRequest,
  ): Promise<GetBookingsByGuideIdResponse> {
    const bookings = await this.bookingsRepo.paginateBookings({
      offset: queryParams.offset,
      limit: queryParams.limit,
      guideId: guideId,
    });
    const results = bookings.map((booking) => ({
      id: booking.id,
      startDate: booking.startDate.toString(),
      endDate: booking.endDate.toString(),
      bookingStatus: booking.bookingStatus,
      postId: booking.postId,
    }));
    return results;
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
      bookingStatus: BookingStatus.WAITING_FOR_GUIDE_CONFIRMATION,
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
    guideUserId: number,
  ): Promise<AcceptBookingResponse> {
    // when the guide accepts the booking, booking status is changed to 'waitingForPayment'
    const booking = await this.bookingsRepo.updateBookingStatus(
      id,
      'waitingForPayment',
    );
    return {
      id: booking.id,
      bookingStatus: booking.bookingStatus,
    };
  }

  async declineBookingByGuide(
    id: number,
    guideUserId: number,
  ): Promise<DeclineBookingResponse> {
    // when the guide declines the booking, booking status is changed to 'guideCancelled'
    const booking = await this.bookingsRepo.updateBookingStatus(
      id,
      'guideCancelled',
    );
    return {
      id: booking.id,
      bookingStatus: booking.bookingStatus,
    };
  }
}
