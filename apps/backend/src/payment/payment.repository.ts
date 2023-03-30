import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTransaction(data: {
    userId: number;
    bookingId: number;
    paymentId: string;
  }) {
    return await this.prisma.transaction.create({
      data: {
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

  async getTransactionWithUserByBookingId(bookingId: number) {
    return await this.prisma.transaction.findMany({
      where: {
        bookingId: bookingId,
      },
      include: {
        user: true,
      },
    });
  }
}
