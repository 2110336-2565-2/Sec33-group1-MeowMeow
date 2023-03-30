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
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  AcceptBookingResponse,
  AccountMetadata,
  CancelBookingByTravellerRequest,
  CancelBookingByTravellerResponse,
  CancelBookingRequest,
  CancelBookingResponse,
  CreateBookingRequest,
  CreateBookingResponse,
<<<<<<< HEAD
  DeclineBookingResponse,
=======
>>>>>>> e11904f... feat: finish booking
  GetBookingsByUserIdResponse,
  GetBookingsByUserIdResponseMember,
} from 'types';
import {
  AccessNotGranted,
  FailedRelationConstraintError,
  InvalidDateFormat,
  RecordAlreadyExist,
  RecordNotFound,
  UnprocessableEntity,
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
  async getBookings(@Req() req): Promise<GetBookingsByUserIdResponse> {
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
    description: 'successfully create a booking',
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
    description: 'record with unique constraint already exist',
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
    summary: 'guide accept booking by ID',
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
    status: HttpStatus.FORBIDDEN,
    description: 'you are not a guide or not the guide in booking',
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
<<<<<<< HEAD
  @Post(':id/accept')
  @HttpCode(HttpStatus.CREATED)
  async acceptBooking(
=======
  @Post(':id/guide/self/accept')
  @HttpCode(HttpStatus.CREATED)
  async acceptBookingByGuide(
>>>>>>> e11904f... feat: finish booking
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AcceptBookingResponse> {
    try {
      const account: AccountMetadata = req.account;
      return this.bookingsService.acceptBookingByGuide(id, account);
    } catch (e) {
<<<<<<< HEAD
      this.handleException(e);
=======
      console.log(e);
      if (e instanceof AccessNotGranted) {
        throw new HttpException(e.message, HttpStatus.FORBIDDEN);
      }
      if (e instanceof RecordNotFound) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      if (e instanceof UnprocessableEntity) {
        throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
      }
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
>>>>>>> e11904f... feat: finish booking
    }
  }

  @ApiCookieAuth('access_token')
  @ApiOperation({
    summary: 'guide decline booking by ID',
  })
<<<<<<< HEAD
=======
  @ApiBody({
    type: CancelBookingRequest,
  })
>>>>>>> e11904f... feat: finish booking
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully decline bookings',
    type: CancelBookingResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'valid session is not provided',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'you are not a guide or the guide in booking',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'booking with given ID was not found',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'booking has already been accepted or cancelled',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(':id/guide/self/decline')
  async declineBookingbyGuide(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CancelBookingResponse> {
    try {
      const account: AccountMetadata = req.account;
      return this.bookingsService.cancelBookingByGuide(id, account);
    } catch (e) {
      console.log(e);
      if (e instanceof AccessNotGranted) {
        throw new HttpException(e.message, HttpStatus.FORBIDDEN);
      }
      if (e instanceof RecordNotFound) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      if (e instanceof UnprocessableEntity) {
        throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
      }
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiCookieAuth('access_token')
  @ApiOperation({
    summary: 'traveller decline booking by ID',
  })
  @ApiBody({
    type: CancelBookingByTravellerRequest,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully decline bookings',
    type: CancelBookingResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'valid session is not provided',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'you are not the owner of a booking',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'booking with given ID was not found',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'trip in a booking has been finished',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post(':id/traveller/self/cancel')
  async cancelBookingByTraveller(
    @Req() req,
    @Param(':id', ParseIntPipe) id: number,
  ): Promise<CancelBookingByTravellerResponse> {
    try {
      const account: AccountMetadata = req.account;
      return this.bookingsService.cancelBookingByTraveller(id, account);
    } catch (e) {
      console.log(e);
      if (e instanceof AccessNotGranted) {
        throw new HttpException(e.message, HttpStatus.FORBIDDEN);
      }
      if (e instanceof RecordNotFound) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      if (e instanceof UnprocessableEntity) {
        throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
      }
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
