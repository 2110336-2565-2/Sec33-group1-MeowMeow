import { ApiProperty } from "@nestjs/swagger";

export class AcceptBookingRequest {}

export class AcceptBookingResponse {
  @ApiProperty({
    type: () => Number,
    minimum: 1,
  })
  id: number;

  @ApiProperty({ type: () => String })
  bookingStatus: string;
}
