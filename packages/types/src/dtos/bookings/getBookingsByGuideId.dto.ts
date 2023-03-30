import { PickType } from "@nestjs/swagger";
import { Booking } from "./booking.dto";

export class GetBookingsByGuideIdResponseMember extends PickType(Booking, [
  "id",
  "startDate",
  "endDate",
  "bookingStatus",
  "postId",
] as const) {}

export type GetBookingsByGuideIdResponse = GetBookingsByGuideIdResponseMember[];
