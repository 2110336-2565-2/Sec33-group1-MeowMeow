import { Injectable } from '@nestjs/common';
import { TransactionType } from 'database';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTransaction(data: {
    userId: number;
    bookingId: number;
    paymentId: string;
    type: TransactionType;
  }) {
    return await this.prisma.transaction.create({
      data: {
        transactionType: data.type,
        paymentID: data.paymentId,
        booking: {
          connect: {
            id: data.bookingId,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });
  }

  async getTransactionByBookingId(bookingId: number) {
    return await this.prisma.transaction.findMany({
      where: {
        bookingId: bookingId,
      },
    });
  }

  async getTransactionWithUserBookingPostByBookingId(bookingId: number) {
    return await this.prisma.transaction.findMany({
      where: {
        bookingId: bookingId,
      },
      include: {
        user: true,
        booking: {
          include: {
            post: true,
          },
        },
      },
    });
  }

  async getTransactionById(id: number) {
    return await this.prisma.transaction.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getAllTransactions() {
    return await this.prisma.transaction.findMany();
  }
}
