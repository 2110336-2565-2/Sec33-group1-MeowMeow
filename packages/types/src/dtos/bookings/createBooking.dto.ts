import { PickType } from "@nestjs/swagger";
import { Booking } from "./booking.dto";
export class CreateBookingRequest extends PickType(Booking, [
  "startDate",
  "endDate",
  "postId",
  "guideId",
  "userId",
] as const) {}
export class CreateBookingResponse extends PickType(Booking, [
  "id",
  "startDate",
  "endDate",
  "bookingStatus",
  "userId",
  "postId",
] as const) {}
