import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty } from "class-validator";

export class Booking {
  @ApiProperty({
    type: () => Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: () => String,
    example: "WAITING_FOR_GUIDE_CONFIRMATION",
  })
  bookingStatus: string;

  @ApiProperty({
    type: () => String,
    example: "2021-01-01T00:00:00.000Z",
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({
    type: () => String,
    example: "2021-01-02T00:00:00.000Z",
  })
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @ApiProperty({
    type: () => Number,
    minimum: 1,
    example: 1,
  })
  @IsInt()
  postId: number;

  @ApiProperty({
    type: () => Number,
    minimum: 1,
    example: 1,
  })
  @IsInt()
  guideId: number;

  @ApiProperty({
    type: () => Number,
    minimum: 1,
    example: 1,
  })
  @IsInt()
  userId: number;
}
