import { ApiProperty } from "@nestjs/swagger";

export class DeclineBookingResponse {
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
