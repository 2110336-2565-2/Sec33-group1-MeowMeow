import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AcceptBookingResponse, DeclineBookingResponse } from 'types';
import { RecordNotFound } from './bookings.common';
import { IBookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(
    @Inject('IBookingsService')
    private readonly bookingsService: IBookingsService,
  ) {}

  @Get()
  async getBookings() {
    // Todo: Implement this
  }

  @Post()
  async createBooking() {
    // Todo: Implement this
  }

  @Put()
  async updateBooking() {
    // Todo: Implement this
  }

  @Post(':id/accept')
  @HttpCode(201)
  async acceptBooking(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AcceptBookingResponse> {
    try {
      return this.bookingsService.acceptBooking(id);
    } catch (e) {
      if (e instanceof RecordNotFound) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':id/decline')
  async declineBooking(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeclineBookingResponse> {
    try {
      return this.bookingsService.declineBooking(id);
    } catch (e) {
      if (e instanceof RecordNotFound) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
