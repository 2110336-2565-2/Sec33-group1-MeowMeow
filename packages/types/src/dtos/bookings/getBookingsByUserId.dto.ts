import { ApiProperty } from "@nestjs/swagger";

export class GetBookingsByUserIdRequest {
  @ApiProperty({
    type: () => Number,
    minimum: 1,
  })
  userId: number;
}

export class GetBooking {
  id: number;
  startDate: string;
  endDate: string;
  bookingStatus: string;
  postId: number;
}

export type GetBookingsByUserIdResponse = GetBooking[];
