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
  GetBookingsByUserIdResponseMember,
} from 'types';
import {
  FailedRelationConstraintError,
  InvalidDateFormat,
  RecordAlreadyExist,
  RecordNotFound,
} from './bookings.common';
import { IBookingsService } from './bookings.service';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(
    @Inject('IBookingsService')
    private readonly bookingsService: IBookingsService,
  ) {}

  handleException(e: Error) {
    console.log(e);
    if (e instanceof RecordNotFound) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
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

  @ApiCookieAuth('access_token')
  @ApiOperation({
    summary: 'get bookings by user ID in the session',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully get the bookings',
    type: [GetBookingsByUserIdResponseMember],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'valid session is not provided',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @UseGuards(AuthGuard)
  @Get('/self')
  async getBookings(@Req() req, @Res({ passthrough: true }) res) {
    try {
      const account: AccountMetadata = req.account;
      return await this.bookingsService.getBookingsByUserId({
        userId: account.userId,
      });
    } catch (e) {
      this.handleException(e);
    }
  }

  @ApiCookieAuth('access_token')
  @ApiOperation({
    summary: 'create new booking',
  })
  @ApiBody({
    type: CreateBookingRequest,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully craete a booking',
    type: CreateBookingResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'some required information is absent or invalid',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'valid session is not provided',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'record ',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post()
  async createBooking(
    @Req() req,
    @Body() reqBody: CreateBookingRequest,
  ): Promise<CreateBookingResponse> {
    try {
      const account: AccountMetadata = req.account;
      reqBody.userId = account.userId;
      return await this.bookingsService.createBooking(reqBody);
    } catch (e) {
      this.handleException(e);
    }
  }

  @ApiCookieAuth('access_token')
  @ApiOperation({
    summary: 'accept booking by ID',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully accept booking',
    type: AcceptBookingResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'valid session is not provided',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'booking with given ID was not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @UseGuards(AuthGuard)
  @Post(':id/accept')
  @HttpCode(HttpStatus.CREATED)
  async acceptBooking(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AcceptBookingResponse> {
    try {
      const account: AccountMetadata = req.account;
      return this.bookingsService.acceptBookingByGuide(id, account.userId);
    } catch (e) {
      this.handleException(e);
    }
  }

  @ApiCookieAuth('access_token')
  @ApiOperation({
    summary: 'decline booking by ID',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully decline bookings',
    type: DeclineBookingResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'valid session is not provided',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'booking with given ID was not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post(':id/decline')
  async declineBooking(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeclineBookingResponse> {
    try {
      const account: AccountMetadata = req.account;
      return this.bookingsService.declineBookingByGuide(id, account.userId);
    } catch (e) {
      this.handleException(e);
    }
  }
}
