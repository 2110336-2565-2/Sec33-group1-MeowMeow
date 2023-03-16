import { ApiProperty } from "@nestjs/swagger";

export class DeclineBookingRequest {}

export class DeclineBookingResponse {
  @ApiProperty({
    type: () => Number,
  })
  id: number;

  @ApiProperty({
    type: () => String,
  })
  bookingStatus: string;
}
