import { Injectable } from '@nestjs/common';
import { BookingStatus } from 'database';
import { AcceptBookingResponse, DeclineBookingResponse } from 'types';
import { BookingsRepository } from './bookings.repository';

export interface IBookingsService {
  acceptBooking(id: number): Promise<AcceptBookingResponse>;
  declineBooking(id: number): Promise<DeclineBookingResponse>;
}

@Injectable()
export class BookingsService implements IBookingsService {
  constructor(private readonly bookingsRepo: BookingsRepository) {}

  async acceptBooking(id: number): Promise<AcceptBookingResponse> {
    const booking = await this.bookingsRepo.updateBookingStatus(
      id,
      BookingStatus.ACCEPTED,
    );

    return {
      id: booking.id,
      bookingStatus: booking.bookingStatus,
    };
  }

  async declineBooking(id: number): Promise<DeclineBookingResponse> {
    const booking = await this.bookingsRepo.updateBookingStatus(
      id,
      BookingStatus.REJECTED,
    );

    return {
      id: booking.id,
      bookingStatus: booking.bookingStatus,
    };
  }
}
