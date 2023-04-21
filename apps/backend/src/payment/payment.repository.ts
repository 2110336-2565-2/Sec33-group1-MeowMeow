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
    const res = await this.prisma.transaction.findMany({
      include: {
        user: true,
        booking: true,
      },
    });

    return res.map((e) => {
      return {
        transactionId: e.id,
        transactionType: e.transactionType,
        userId: e.userId,
        username: e.user.username,
        bookingId: e.bookingId,
        postId: e.booking.postId,
      };
    });
  }

  async getTransactionByUserId(userId: number) {
    const res = await this.prisma.transaction.findMany({
      where: {
        userId: userId,
      },
      include: {
        booking: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return res.map((e) => {
      return {
        transactionId: e.id,
        transactionType: e.transactionType,
        userId: e.userId,
        bookingId: e.bookingId,
        postId: e.booking.postId,
        updatedAt: e.updatedAt,
      };
    });
  }
}
