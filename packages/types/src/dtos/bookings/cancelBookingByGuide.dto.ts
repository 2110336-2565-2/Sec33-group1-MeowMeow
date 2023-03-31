import { ApiProperty } from "@nestjs/swagger";

export class CancelBookingRequest {}

export class CancelBookingResponse {
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
