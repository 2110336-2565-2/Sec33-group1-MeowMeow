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
import { AuthGuard } from 'src/auth/auth.guard';
import { PaymentService } from './payment.service';

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
}
