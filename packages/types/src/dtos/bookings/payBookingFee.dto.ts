import { ApiProperty } from "@nestjs/swagger";

export class PayBookingFeeRequest {}

export class PayBookingFeeResponse {
  @ApiProperty({
    type: () => String,
  })
  message: string;

  @ApiProperty({
    type: () => Number,
  })
  bookingId: number;

  @ApiProperty({
    type: () => String,
  })
  bookingStatus: string;
}
