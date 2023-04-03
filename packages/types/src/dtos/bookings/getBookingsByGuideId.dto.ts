import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from "@nestjs/swagger";
import { Booking } from "./booking.dto";
import { IsArray, IsInt, IsString, Min } from "class-validator";
import { Type } from "class-transformer";
import { BookingStatus } from "database";
export class GetBookingsByGuideIdRequest extends IntersectionType(
  PickType(Booking, ["limit", "offset"] as const),
  PartialType(PickType(Booking, ["bookingStatusFilter"] as const))
) {}

export class GetBookingsByGuideIdResponseMember extends PickType(Booking, [
  "id",
  "startDate",
  "endDate",
  "bookingStatus",
  "postId",
  "userId",
  "username",
  "firstName",
  "lastName",
] as const) {}

export class GetBookingsByGuideIdResponse {
  @ApiProperty({
    type: () => [GetBookingsByGuideIdResponseMember],
    description: "guide's bookings",
  })
  bookings: GetBookingsByGuideIdResponseMember[];

  @ApiProperty({
    type: () => Number,
    description: "number of guide's bookings",
    example: 100,
  })
  @Type(() => Number)
  bookingsCount: number;
}
