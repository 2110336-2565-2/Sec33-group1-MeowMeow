import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty } from "class-validator";

export class CreateBookingRequest {
  @ApiProperty({ type: () => String })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ type: () => String })
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @ApiProperty({
    type: () => Number,
    minimum: 1,
  })
  @IsInt()
  postId: number;

  @ApiProperty({
    type: () => Number,
    minimum: 1,
  })
  @IsInt()
  guideId: number;

  @ApiProperty({
    type: () => Number,
    minimum: 1,
  })
  @IsInt()
  userId: number;
}

export class CreateBookingResponse {
  @ApiProperty({
    type: () => Number,
  })
  id: number;

  @ApiProperty({
    type: () => String,
  })
  startDate: string;

  @ApiProperty({
    type: () => String,
  })
  endDate: string;

  @ApiProperty({
    type: () => String,
  })
  bookingStatus: string;

  @ApiProperty({
    type: () => Number,
  })
  userId: number;

  @ApiProperty({
    type: () => Number,
  })
  postId: number;
}
