import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PayBooking {
  @ApiProperty({
    type: () => String,
    required: true,
    description: "token for payment from omise",
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    type: () => Number,
    required: true,
    description: "booking id to pay",
  })
  @IsNumber()
  @IsNotEmpty()
  bookingId: number;
}
