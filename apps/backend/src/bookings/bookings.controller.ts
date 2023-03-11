import {
  AcceptBookingRequest,
  AcceptBookingResponse,
  DeclineBookingRequest,
  DeclineBookingResponse,
  GetBookingRequest,
  GetBookingsResponse,
  CreateBookingRequest,
  CreateBookingResponse,
  UpdateBookingRequest,
  UpdateBookingResponse,
} from 'types';

import { Controller, Get, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('bookings')
export class BookingsController {
  @ApiOperation({
    summary: 'sign in with username and password',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully get bookings',
    type: GetBookingsResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
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
  async acceptBooking() {
    // Todo: Implement this
  }

  @Post(':id/decline')
  async declineBooking() {
    // Todo: Implement this
  }
}
