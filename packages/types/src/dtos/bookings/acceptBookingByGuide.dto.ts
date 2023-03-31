import { ApiProperty } from "@nestjs/swagger";

export class AcceptBookingResponse {
  @ApiProperty({
    type: () => Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: () => String,
    example: "WAITING_FOR_PAYMENT",
  })
  bookingStatus: string;
}
