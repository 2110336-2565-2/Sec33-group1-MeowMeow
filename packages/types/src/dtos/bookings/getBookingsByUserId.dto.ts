import { ApiProperty, PickType } from "@nestjs/swagger";
import { Booking } from "./booking.dto";

export class GetBookingsByUserIdRequest {
  @ApiProperty({
    type: () => Number,
    minimum: 1,
    example: 1,
  })
  userId: number;
}

export class GetBookingsByUserIdResponseMember extends PickType(Booking, [
  "id",
  "startDate",
  "endDate",
  "bookingStatus",
  "postId",
] as const) {}

export type GetBookingsByUserIdResponse = GetBookingsByUserIdResponseMember[];
