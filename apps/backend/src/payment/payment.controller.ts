import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AccountMetadata, PayBooking } from 'types';
import { PaymentService } from './payment.service';

@ApiTags('Payment')
@Controller('payment')
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

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully pay the booking',
  })
  async get() {
    return this.paymentService.transfer(12);
  }
}
