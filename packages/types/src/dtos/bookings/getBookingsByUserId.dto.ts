import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from "@nestjs/swagger";
import { Booking } from "./booking.dto";
import { Type } from "class-transformer";

export class GetBookingsByUserIdRequest extends IntersectionType(
  PickType(Booking, ["limit", "offset"] as const),
  PartialType(PickType(Booking, ["bookingStatusFilter"] as const))
) {}

export class GetBookingsByUserIdResponseMember extends PickType(Booking, [
  "id",
  "startDate",
  "endDate",
  "bookingStatus",
  "postId",
  "userId",
  "username",
  "firstName",
  "lastName",
] as const) {
  @ApiProperty({
    type: () => String,
  })
  username: string;

  @ApiProperty({
    type: () => String,
  })
  firstName: string;

  @ApiProperty({
    type: () => String,
  })
  lastName: string;
}

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
