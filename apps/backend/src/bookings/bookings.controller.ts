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
import {
  AcceptBookingResponse,
  DeclineBookingResponse,
  GetBookingsByUserIdRequest,
  GetBookingsByUserIdResponse,
} from 'types';
import { RecordNotFound } from './bookings.common';
import { IBookingsService } from './bookings.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

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

  @ApiOperation({
    summary: 'create new booking',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully craete a booking',
    type: GetBookingsByUserIdResponse,
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
  @Post()
  async createBooking() {
    // Todo: Implement this
  }

  @ApiOperation({
    summary: 'update booking by ID',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully get bookings',
    type: GetBookingsByUserIdResponse,
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
  @Put(':id')
  async updateBooking() {
    // Todo: Implement this
  }

  @ApiOperation({
    summary: 'accept booking by ID',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully accept booking',
    type: GetBookingsByUserIdResponse,
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

  @ApiOperation({
    summary: 'decline booking by ID',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully decline bookings',
    type: GetBookingsByUserIdResponse,
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
