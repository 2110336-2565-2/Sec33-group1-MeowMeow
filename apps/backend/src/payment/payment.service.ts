import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime';
import { backendConfig } from 'config';
import { BookingStatus, Role } from 'database';
import * as qs from 'qs';
import { firstValueFrom, map } from 'rxjs';
import { BookingsRepository } from 'src/bookings/bookings.repository';
import { UsersRepository } from 'src/users/users.repository';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  private readonly publicKey: string;
  private readonly secretKey: string;
  private readonly createRecipientUrl: string;
  private readonly chargesUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly userRepository: UsersRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly bookingRepository: BookingsRepository,
  ) {
    this.publicKey = Buffer.from(backendConfig.omise.publicKey).toString(
      'base64',
    );
    this.secretKey = Buffer.from(backendConfig.omise.secretKey).toString(
      'base64',
    );
    this.createRecipientUrl = backendConfig.omise.createRecipientUrl;
    this.chargesUrl = backendConfig.omise.chargesUrl;
  }

  async createRecipient(data: {
    userId: number;
    taxId?: string;
    brandBankAccount: string;
    numberBankAccount: string;
    nameBankAccount: string;
  }) {
    const user = await this.userRepository.getUserById(data.userId);

    const body = qs.stringify({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      type: 'individual',
      tax_id: data.taxId,
      'bank_account[brand]': data.brandBankAccount,
      'bank_account[number]': data.numberBankAccount,
      'bank_account[name]': data.nameBankAccount,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      headers: {
        Authorization: `Basic ${this.secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const res = await firstValueFrom(
      this.httpService
        .post(this.createRecipientUrl, body, config)
        .pipe(map((res) => res.data)),
    );
    if (!res.id) {
      throw new InternalServerErrorException('cannot create recipient');
    }
    return res.id;
  }

  async charge(data: { userId: number; bookingId: number; token: string }) {
    const payments =
      await this.paymentRepository.getTransactionWithUserByBookingId(
        data.bookingId,
      );

    payments.forEach((payment) => {
      if (payment.user.roles.includes(Role.USER)) {
        throw new InternalServerErrorException('already paid');
      }
    });

    const booking = await this.bookingRepository.getBookingAndPostById(
      data.bookingId,
    );

    if (booking.bookingStatus !== BookingStatus.WAITING_FOR_PAYMENT) {
      throw new MethodNotAllowedException(
        'cannot pay booking should be in status (' +
          BookingStatus.WAITING_FOR_PAYMENT +
          ') but is (' +
          booking.bookingStatus +
          ')',
      );
    }

    const body = qs.stringify({
      amount: Math.ceil(Decimal.mul(booking.post.fee, 100).toNumber()),
      currency: 'thb',
      card: data.token,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      headers: {
        Authorization: `Basic ${this.secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    let res;
    try {
      res = await firstValueFrom(
        this.httpService
          .post(this.chargesUrl, body, config)
          .pipe(map((res) => res.data)),
      );
    } catch (e) {
      throw new InternalServerErrorException('cannot create recipient');
    }

    // should be in transaction but for demo purpose
    const transaction = await this.paymentRepository.createTransaction({
      userId: data.userId,
      bookingId: data.bookingId,
      paymentId: res.id,
    });

    await this.bookingRepository.updateBookingStatus(
      data.bookingId,
      BookingStatus.WAITING_FOR_TRAVELING,
    );

    return transaction;
  }
}
