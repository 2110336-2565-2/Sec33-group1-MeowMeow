import { ApiProperty, PickType } from "@nestjs/swagger";
import { Booking } from "./booking.dto";
import { IsInt, Min } from "class-validator";
import { Type } from "class-transformer";
export class GetBookingsByUserIdRequest {
  @ApiProperty({
    type: () => Number,
    description: "search offset",
    example: 0,
  })
  @Type(() => Number)
  @Min(0)
  @IsInt()
  offset: number;

  @ApiProperty({
    type: () => Number,
    description: "search limit",
    example: 1,
  })
  @Type(() => Number)
  @Min(1)
  @IsInt()
  limit: number;
}

export class GetBookingsByUserIdResponseMember extends PickType(Booking, [
  "id",
  "startDate",
  "endDate",
  "bookingStatus",
  "postId",
] as const) {}

export class GetBookingsByUserIdResponse {
  @ApiProperty({
    type: () => [GetBookingsByUserIdResponseMember],
    description: "user's bookings",
  })
  bookings: GetBookingsByUserIdResponseMember[];

  @ApiProperty({
    type: () => Number,
    description: "number of user's bookings",
    example: 100,
  })
  @Type(() => Number)
  bookingsCount: number;
}
