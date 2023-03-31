import { Inject, Injectable } from '@nestjs/common';
import {
  AcceptBookingResponse,
  AccountMetadata,
  CreateBookingRequest,
  CreateBookingResponse,
  DeclineBookingResponse,
  GetBookingsByGuideIdRequest,
  GetBookingsByGuideIdResponse,
  GetBookingsByUserIdRequest,
  GetBookingsByUserIdResponse,
  PayBookingFeeResponse,
  CancelBookingByTravellerResponse,
} from 'types';
import { BookingsRepository } from './bookings.repository';
import {
  AccessNotGranted,
  InvalidDateFormat,
  UnprocessableEntity,
} from './bookings.common';
import { GuidesService } from 'src/guides/guides.service';
import { GuideNotFound } from 'src/guides/guides.common';
import * as moment from 'moment';

export interface IBookingsService {
  acceptBookingByGuide(
    bookingId: number,
    account: AccountMetadata,
  ): Promise<AcceptBookingResponse>;
  cancelBookingByGuide(
    bookingId: number,
    account: AccountMetadata,
  ): Promise<CancelBookingResponse>;
  payBookingFee(
    bookingId: number,
    account: AccountMetadata,
  ): Promise<PayBookingFeeResponse>;
  cancelBookingByTraveller(
    bookingId: number,
    account: AccountMetadata,
  ): Promise<CancelBookingByTravellerResponse>;
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
  constructor(
    private readonly bookingsRepo: BookingsRepository,
    @Inject('GuidesService') private readonly guideService: GuidesService,
  ) {}

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
      bookingStatus: 'WAITING_FOR_GUIDE_CONFIRMATION',
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
    bookingId: number,
    account: AccountMetadata,
  ): Promise<AcceptBookingResponse> {
    try {
      const guide = await this.guideService.getGuideByUserId(account.userId);
      const booking = await this.bookingsRepo.getBookingById(bookingId);
      if (booking.guideId !== guide.guideId) {
        throw new AccessNotGranted('permissing denied');
      }
      console.log(booking.id);
      if (booking.bookingStatus !== 'WAITING_FOR_GUIDE_CONFIRMATION') {
        throw new UnprocessableEntity(
          'this booking has been accepted or cancelled',
        );
      }

      const acceptedBooking = await this.bookingsRepo.updateBookingStatus(
        bookingId,
        'WAITING_FOR_PAYMENT',
      );
      return {
        id: acceptedBooking.id,
        bookingStatus: acceptedBooking.bookingStatus,
      };
    } catch (e) {
      if (e instanceof GuideNotFound) {
        throw new AccessNotGranted('permission denied');
      }
      throw e;
    }
  }

  async cancelBookingByGuide(
    bookingId: number,
    account: AccountMetadata,
  ): Promise<CancelBookingResponse> {
    try {
      const guide = await this.guideService.getGuideByUserId(account.userId);
      const booking = await this.bookingsRepo.getBookingById(bookingId);
      if (booking.guideId !== guide.guideId) {
        throw new AccessNotGranted('permissing denied');
      }
      if (
        booking.bookingStatus !== 'WAITING_FOR_GUIDE_CONFIRMATION' &&
        booking.bookingStatus !== 'WAITING_FOR_PAYMENT'
      ) {
        throw new UnprocessableEntity(
          'this booking has been accepted or cancelled',
        );
      }

      const cancelledBooking = await this.bookingsRepo.updateBookingStatus(
        bookingId,
        'GUIDE_CANCELLED',
      );
      return {
        id: cancelledBooking.id,
        bookingStatus: cancelledBooking.bookingStatus.toString(),
      };
    } catch (e) {
      if (e instanceof GuideNotFound) {
        throw new AccessNotGranted('permission denied');
      }
      throw e;
    }
  }

  async payBookingFee(
    bookingId: number,
    account: AccountMetadata,
  ): Promise<PayBookingFeeResponse> {
    try {
      const booking = await this.bookingsRepo.getBookingById(bookingId);
      if (booking.userId !== account.userId) {
        throw new AccessNotGranted('permissing denied');
      }
      if (booking.bookingStatus !== 'WAITING_FOR_PAYMENT') {
        throw new UnprocessableEntity(
          'this booking has not beed waiting for payment',
        );
      }

      const now = new Date();
      const paymentDeadline = moment(booking.updatedAt).add(1, 'days').toDate();
      if (now > paymentDeadline) {
        const cancelledBooking = await this.bookingsRepo.updateBookingStatus(
          bookingId,
          'USER_CANCELLED',
        );
        return {
          message: 'booking payment exceeds the deadline',
          bookingId: cancelledBooking.id,
          bookingStatus: cancelledBooking.bookingStatus.toString(),
        };
      }

      // TODO call payment api

      const paidBooking = await this.bookingsRepo.updateBookingStatus(
        bookingId,
        'TRAVELING',
      );
      return {
        message: 'success',
        bookingId: paidBooking.id,
        bookingStatus: paidBooking.bookingStatus.toString(),
      };
    } catch (e) {
      if (e instanceof GuideNotFound) {
        throw new AccessNotGranted('permission denied');
      }
      throw e;
    }
  }

  // TRAVELING = PAID
  async cancelBookingByTraveller(
    bookingId: number,
    account: AccountMetadata,
  ): Promise<CancelBookingByTravellerResponse> {
    try {
      const booking = await this.bookingsRepo.getBookingById(bookingId);
      if (booking.userId !== account.userId) {
        throw new AccessNotGranted('permissing denied');
      }
      if (booking.bookingStatus !== 'TRAVELING') {
        throw new UnprocessableEntity(
          'this booking has not beed available for user cancelation',
        );
      }

      const now = new Date();
      const refundDeadline = moment(booking.startDate)
        .subtract(5, 'days')
        .toDate();
      if (now > booking.startDate) {
        throw new UnprocessableEntity('this trip has already started');
      }

      if (now > refundDeadline) {
        const cancelledBooking = await this.bookingsRepo.updateBookingStatus(
          bookingId,
          'USER_CANCELLED',
        );
        return {
          message: 'cancelled without refund',
          refunded: false,
          bookingId: cancelledBooking.id,
          bookingStatus: cancelledBooking.bookingStatus.toString(),
        };
      }

      // call refund payment

      const refundedBooking = await this.bookingsRepo.updateBookingStatus(
        bookingId,
        'USER_CANCELLED',
      );
      return {
        message: 'cancelled with refund',
        refunded: true,
        bookingId: refundedBooking.id,
        bookingStatus: refundedBooking.bookingStatus.toString(),
      };
    } catch (e) {
      throw e;
    }
  }
}
