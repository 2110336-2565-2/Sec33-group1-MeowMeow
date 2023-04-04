import { Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { GuideNotFound } from 'src/guides/guides.common';
import { GuidesService } from 'src/guides/guides.service';
import { PaymentService } from 'src/payment/payment.service';
import {
  AcceptBookingResponse,
  AccountMetadata,
  CancelBookingByTravellerResponse,
  CancelBookingResponse,
  CreateBookingRequest,
  CreateBookingResponse,
  GetBookingsByGuideIdRequest,
  GetBookingsByGuideIdResponse,
  GetBookingsByUserIdRequest,
  GetBookingsByUserIdResponse,
  PayBookingFeeResponse,
} from 'types';
import {
  AccessNotGranted,
  InvalidDateFormat,
  UnprocessableEntity,
} from './bookings.common';
import { BookingsRepository } from './bookings.repository';
import { PostsService } from 'src/posts/posts.service';
import { BookingStatus } from 'database';

export interface IBookingsService {
  acceptBookingByGuide(
    bookingId: number,
    account: AccountMetadata,
  ): Promise<AcceptBookingResponse>;
  cancelBookingByGuide(
    userId: number,
    bookingId: number,
  ): Promise<CancelBookingResponse>;
  payBookingFee(
    bookingId: number,
    account: AccountMetadata,
    token: string,
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
  createBooking(
    userId: number,
    req: CreateBookingRequest,
  ): Promise<CreateBookingResponse>;
}

@Injectable()
export class BookingsService implements IBookingsService {
  constructor(
    private readonly bookingsRepo: BookingsRepository,
    @Inject('PostsService') private readonly postsService: PostsService,
    private readonly paymentsService: PaymentService,
    @Inject('GuidesService') private readonly guideService: GuidesService,
  ) {}

  async getBookingsByUserId(
    userId: number,
    queryParams: GetBookingsByUserIdRequest,
  ): Promise<GetBookingsByUserIdResponse> {
    const [bookingsCount, bookings] = await this.bookingsRepo.paginateBookings({
      offset: queryParams.offset,
      limit: queryParams.limit,
      userId: userId,
      bookingStatusFilter: queryParams.bookingStatusFilter,
    });
    const results = bookings.map((booking) => ({
      id: booking.id,
      startDate: booking.startDate.toString(),
      endDate: booking.endDate.toString(),
      bookingStatus: booking.bookingStatus,
      postId: booking.postId,
      userId: booking.userId,
      username: booking.username,
      firstName: booking.firstName,
      lastName: booking.lastName,
    }));
    return {
      bookings: results,
      bookingsCount: bookingsCount,
    };
  }

  async getBookingsByGuideId(
    guideId: number,
    queryParams: GetBookingsByGuideIdRequest,
  ): Promise<GetBookingsByGuideIdResponse> {
    const [bookingsCount, bookings] = await this.bookingsRepo.paginateBookings({
      offset: queryParams.offset,
      limit: queryParams.limit,
      guideId: guideId,
      bookingStatusFilter: queryParams.bookingStatusFilter,
    });
    const results = bookings.map((booking) => ({
      id: booking.id,
      startDate: booking.startDate.toString(),
      endDate: booking.endDate.toString(),
      bookingStatus: booking.bookingStatus,
      postId: booking.postId,
      userId: booking.userId,
      username: booking.username,
      firstName: booking.firstName,
      lastName: booking.lastName,
    }));
    return {
      bookings: results,
      bookingsCount: bookingsCount,
    };
  }

  async createBooking(
    userId: number,
    req: CreateBookingRequest,
  ): Promise<CreateBookingResponse> {
    if (isNaN(Date.parse(req.startDate))) {
      throw new InvalidDateFormat("invalid 'stardDate' format");
    }
    if (isNaN(Date.parse(req.endDate))) {
      throw new InvalidDateFormat("invalid 'endDate' format");
    }

    const post = await this.postsService.getPostById(req.postId);
    if (userId == post.authorId) {
      throw new UnprocessableEntity('cannot book your own post');
    }

    const booking = await this.bookingsRepo.createBooking({
      userId: userId,
      postId: req.postId,
      guideId: req.guideId,
      startDate: new Date(req.startDate),
      endDate: new Date(req.endDate),
      bookingStatus: 'WAITING_FOR_GUIDE_CONFIRMATION',
    });

    return {
      id: booking.id,
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
    userId: number,
    bookingId: number,
  ): Promise<CancelBookingResponse> {
    try {
      const booking = await this.bookingsRepo.getBookingById(bookingId);
      const guide = await this.guideService.getGuideByUserId(userId);
      if (booking.guideId !== guide.guideId) {
        throw new AccessNotGranted('permissing denied');
      }
      const cancelledBooking = await this.bookingsRepo.updateBookingStatus(
        bookingId,
        BookingStatus.GUIDE_CANCELLED,
      );

      if (
        booking.bookingStatus === 'WAITING_FOR_GUIDE_CONFIRMATION' ||
        booking.bookingStatus === 'WAITING_FOR_PAYMENT'
      ) {
        return {
          id: cancelledBooking.id,
          refunded: false,
          bookingStatus: cancelledBooking.bookingStatus.toString(),
        };
      }

      await this.paymentsService.refund(bookingId);
      return {
        id: cancelledBooking.id,
        refunded: true,
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
    token: string,
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

      await this.paymentsService.charge({
        userId: account.userId,
        bookingId: bookingId,
        token: token,
      });

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
      console.log({ booking, account });
      if (booking.userId !== account.userId) {
        throw new AccessNotGranted('permissing denied');
      }
      if (
        booking.bookingStatus === 'USER_CANCELLED' ||
        booking.bookingStatus === 'GUIDE_CANCELLED' ||
        booking.bookingStatus === 'FINISHED'
      ) {
        throw new UnprocessableEntity(
          'this booking has not beed available for user cancelation',
        );
      }

      if (
        booking.bookingStatus === 'WAITING_FOR_GUIDE_CONFIRMATION' ||
        booking.bookingStatus === 'WAITING_FOR_PAYMENT'
      ) {
        const refundedBooking = await this.bookingsRepo.updateBookingStatus(
          bookingId,
          'USER_CANCELLED',
        );
        return {
          message: 'cancelled without refund',
          refunded: false,
          bookingId: refundedBooking.id,
          bookingStatus: refundedBooking.bookingStatus.toString(),
        };
      }

      const now = new Date();
      const refundDeadline = moment(booking.startDate)
        .subtract(5, 'days')
        .toDate();
      const tripPaid = booking.bookingStatus !== 'TRAVELING';
      if (now > refundDeadline || tripPaid || now > refundDeadline) {
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

      await this.paymentsService.refund(bookingId);

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
