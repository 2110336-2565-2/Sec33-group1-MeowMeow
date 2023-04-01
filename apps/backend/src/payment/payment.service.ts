import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime';
import { backendConfig } from 'config';
import { Booking, Post, Transaction, TransactionType, User } from 'database';
import * as qs from 'qs';
import { firstValueFrom, map } from 'rxjs';
import { BookingsRepository } from 'src/bookings/bookings.repository';
import { UsersRepository } from 'src/users/users.repository';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  private readonly secretKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly userRepository: UsersRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly bookingRepository: BookingsRepository,
  ) {
    this.secretKey = Buffer.from(backendConfig.omise.secretKey).toString(
      'base64',
    );
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
        .post('https://api.omise.co/recipients', body, config)
        .pipe(map((res) => res.data)),
    );
    if (!res.id) {
      throw new InternalServerErrorException('cannot create recipient');
    }
    return res.id;
  }

  async charge(data: { userId: number; bookingId: number; token: string }) {
    const booking = await this.bookingRepository.getBookingAndPostById(
      data.bookingId,
    );

    const transactions = await this.paymentRepository.getTransactionByBookingId(
      data.bookingId,
    );

    transactions.forEach((transaction) => {
      if (transaction.transactionType === TransactionType.CHARGES) {
        throw new InternalServerErrorException('already paid');
      }
    });

    const transactions = await this.paymentRepository.getTransactionByBookingId(
      data.bookingId,
    );

    transactions.forEach((transaction) => {
      if (transaction.transactionType === TransactionType.CHARGES) {
        throw new InternalServerErrorException('already paid');
      }
    });

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
          .post('https://api.omise.co/charges', body, config)
          .pipe(map((res) => res.data)),
      );
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }

    const transaction = await this.paymentRepository.createTransaction({
      userId: data.userId,
      bookingId: data.bookingId,
      paymentId: res.id,
      type: TransactionType.CHARGES,
    });

    await this.bookingRepository.updateBookingStatus(
      data.bookingId,
      'waitingForTraveling',
    );

    return transaction;
  }
  // refund booking based on post fee it will not set booking status
  async refund(bookingId: number) {
    const transactions =
      await this.paymentRepository.getTransactionWithUserBookingPostByBookingId(
        bookingId,
      );

    let payment: Transaction & {
      booking: Booking & {
        post: Post;
      };
      user: User;
    };
    transactions.forEach((transaction) => {
      if (transaction.transactionType === TransactionType.CHARGES) {
        payment = transaction;
      }
    });
    if (!payment) {
      throw new InternalServerErrorException('cannot find payment');
    }

    const body = qs.stringify({
      amount: Math.ceil(Decimal.mul(payment.booking.post.fee, 100).toNumber()),
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
          .post(
            `https://api.omise.co/charges/${payment.paymentID}/refunds`,
            body,
            config,
          )
          .pipe(map((res) => res.data)),
      );
    } catch (e) {
      throw new InternalServerErrorException('cannot refund');
    }

    if (!res.id) {
      throw new InternalServerErrorException('cannot refund');
    }

    const transaction = await this.paymentRepository.createTransaction({
      userId: payment.booking.userId,
      bookingId: bookingId,
      paymentId: res.id,
      type: TransactionType.REFUNDS,
    });

    return transaction;
  }

  async transfer(bookingId: number) {
    const booking = await this.bookingRepository.getGuideByBookingId(bookingId);

    const transactions =
      await this.paymentRepository.getTransactionWithUserBookingPostByBookingId(
        bookingId,
      );
    let payment;
    transactions.forEach((transaction) => {
      if (transaction.transactionType === TransactionType.TRANSFERS) {
        payment = transaction;
      }
    });
    if (payment) {
      throw new InternalServerErrorException('already transfer');
    }

    const body = qs.stringify({
      amount: Math.ceil(Decimal.mul(booking.post.fee, 100).toNumber()),
      recipient: booking.post.author.guide.paymentId,
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
          .post(`https://api.omise.co/transfers`, body, config)
          .pipe(map((res) => res.data)),
      );
    } catch (e) {
      throw new InternalServerErrorException('cannot refund');
    }

    if (!res.id) {
      throw new InternalServerErrorException('cannot refund');
    }

    const transaction = await this.paymentRepository.createTransaction({
      userId: booking.post.author.guide.userId,
      bookingId: bookingId,
      paymentId: res.id,
      type: TransactionType.TRANSFERS,
    });

    return transaction;
  }

  async getAllTransaction() {
    const transactions = await this.paymentRepository.getAllTransactions();
    return transactions;
  }
}
