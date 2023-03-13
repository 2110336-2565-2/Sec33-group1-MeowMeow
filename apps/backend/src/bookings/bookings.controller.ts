import {
  Body,
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
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  AcceptBookingResponse,
  AccountMetadata,
  CreateBookingRequest,
  CreateBookingResponse,
  DeclineBookingResponse,
  GetBookingsByUserIdRequest,
  GetBookingsByUserIdResponse,
} from 'types';
import {
  FailedRelationConstraintError,
  InvalidDateFormat,
  RecordAlreadyExist,
  RecordNotFound,
} from './bookings.common';
import { IBookingsService } from './bookings.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('bookings')
export class BookingsController {
  constructor(
    @Inject('IBookingsService')
    private readonly bookingsService: IBookingsService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/self')
  async getBookings(@Req() req, @Res({ passthrough: true }) res) {
    try {
      const account: AccountMetadata = req.account;
      const resBody = await this.bookingsService.getBookingsByUserId({
        userId: account.userId,
      });
      res.status(HttpStatus.OK).send(resBody);
    } catch (e) {
      console.log(e);
      if (e instanceof RecordNotFound) {
        throw new HttpException({ message: e.message }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        { message: 'internal server error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({
    summary: 'create new booking',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully craete a booking',
    type: CreateBookingResponse,
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
  @UseGuards(AuthGuard)
  @Post()
  async createBooking(
    @Req() req,
    @Body() reqBody: CreateBookingRequest,
    @Res() res,
  ) {
    try {
      const account: AccountMetadata = req.account;
      reqBody.userId = account.userId;
      const booking = await this.bookingsService.createBooking(reqBody);
      res.status(HttpStatus.CREATED).send(booking);
    } catch (e) {
      console.log(e);
      if (e instanceof InvalidDateFormat) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      }
      if (e instanceof FailedRelationConstraintError) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      }
      if (e instanceof RecordAlreadyExist) {
        throw new HttpException(e.message, HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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
