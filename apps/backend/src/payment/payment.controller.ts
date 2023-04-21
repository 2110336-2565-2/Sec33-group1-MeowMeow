import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'database';
import { AuthGuard } from '../auth/auth.guard';
import { PaymentService } from './payment.service';
import { AccountMetadata } from 'types';

@ApiTags('Payment')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

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

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully get transaction by traveller id',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'access token not provided',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @ApiCookieAuth('access_token')
  @UseGuards(AuthGuard)
  @Get('/user')
  @HttpCode(HttpStatus.OK)
  async getTransactionByTravellerID(@Req() req) {
    if (!req.account.roles.includes(Role.USER)) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }
    const account: AccountMetadata = req.account;
    return this.paymentService.getTransactionByUserId(account.userId);
  }
}
