import { PickType } from "@nestjs/swagger";
import { Booking } from "./booking.dto";
export class CreateBookingRequest extends PickType(Booking, [
  "startDate",
  "endDate",
  "postId",
] as const) {}
export class CreateBookingResponse extends PickType(Booking, [
  "id",
  "startDate",
  "endDate",
  "bookingStatus",
  "postId",
] as const) {}
