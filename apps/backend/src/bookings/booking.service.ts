import { Injectable } from '@nestjs/common';

import {
  AcceptBookingRequest,
  AcceptBookingResponse,
  CreateBookingRequest,
  CreateReviewResponse,
  DeclineBookingRequest,
  DeclineBookingResponse,
  DeletePostResponse,
  GetBookingsByUserIdRequest,
  GetBookingsByUserIdResponse,
  UpdateBookingRequest,
  UpdatePostResponse,
} from 'types';
import { BookingRepository } from './booking.repository';

@Injectable()
export class BookingService {
  constructor(private readonly bookingRepo: BookingRepository) {}

  async acceptBooking(
    req: AcceptBookingRequest,
  ): Promise<AcceptBookingResponse> {
    return null;
  }

  async declineBooking(
    req: DeclineBookingRequest,
  ): Promise<DeclineBookingResponse> {
    return null;
  }

  async getBookingByUserId(
    req: GetBookingsByUserIdRequest,
  ): Promise<GetBookingsByUserIdResponse> {
    return null;
  }

  async createBooking(
    req: CreateBookingRequest,
  ): Promise<CreateReviewResponse> {
    return null;
  }

  async updateBooking(req: UpdateBookingRequest): Promise<UpdatePostResponse> {
    return null;
  }
}
