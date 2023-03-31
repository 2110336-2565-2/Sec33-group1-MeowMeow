import { ApiProperty } from "@nestjs/swagger";

export class CancelBookingByTravellerRequest {}

export class CancelBookingByTravellerResponse {
  @ApiProperty({
    type: () => String,
    description: "message describing the result",
    example: "cancelled with refund",
  })
  message: string;

  @ApiProperty({
    type: () => Boolean,
    description: "true if the traveller get a refund",
    example: true,
  })
  refunded: boolean;

  @ApiProperty({
    type: Number,
    description: "booking ID",
    example: 134,
  })
  bookingId: number;

  @ApiProperty({
    type: Number,
    description: "booking status",
    example: "WAITING_FOR_PAYMENT",
  })
  bookingStatus: string;
}
