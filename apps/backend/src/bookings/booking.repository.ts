import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Booking } from 'database';

@Injectable()
export class BookingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async paginateBookingsById(data: {
    offset: number;
    limit: number;
    userId: number;
  }): Promise<
    {
      id: number;
      startDate: Date;
      endDate: Date;
      bookingStatus: string;
      userId: number;
      postId: number;
    }[]
  > {
    const results = this.prismaService.booking.findMany();
    return null;
  }
}
