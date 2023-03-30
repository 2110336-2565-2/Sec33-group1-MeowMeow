import { ApiProperty } from "@nestjs/swagger";

<<<<<<< HEAD:packages/types/src/dtos/bookings/declineBooking.dto.ts
export class DeclineBookingResponse {
=======
export class CancelBookingRequest {}

export class CancelBookingResponse {
>>>>>>> e11904f... feat: finish booking:packages/types/src/dtos/bookings/cancelBookingByGuide.dto.ts
  @ApiProperty({
    type: () => Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: () => String,
    example: "GUIDE_CANCELLED",
  })
  bookingStatus: string;
}
