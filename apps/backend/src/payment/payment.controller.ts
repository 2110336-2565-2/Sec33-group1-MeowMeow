import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'database';
import { AuthGuard } from 'src/auth/auth.guard';
import { AccountMetadata, PayBooking } from 'types';
import { PaymentService } from './payment.service';

@ApiTags('Payment')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully pay the booking',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid booking ID or Token',
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  async payBooking(@Req() req, @Body() body: PayBooking) {
    const account: AccountMetadata = req.account;
    console.log({
      userId: account.userId,
      bookingId: body.bookingId,
      token: body.token,
    });
    return await this.paymentService.charge({
      userId: account.userId,
      bookingId: body.bookingId,
      token: body.token,
    });
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Get()
  async getTransaction(@Req() req) {
    if (!req.account.roles.includes(Role.ADMIN)) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }
    return this.paymentService.getAllTransaction();
  }
}
