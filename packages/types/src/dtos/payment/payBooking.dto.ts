import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PayBooking {
  @ApiProperty({
    type: () => String,
    required: true,
    description: "token for payment from omise",
    example: "tokn_test_5jx9z2z5q0q7q2z6x0z",
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
