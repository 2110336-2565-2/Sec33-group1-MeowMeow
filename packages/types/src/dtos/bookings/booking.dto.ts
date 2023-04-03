import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from "class-validator";
import { BookingStatus } from "database";

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

  @ApiProperty({
    type: () => String,
    example: "9near",
  })
  username: string;

  @ApiProperty({
    type: () => String,
    example: "Arthur",
  })
  firstName: string;

  @ApiProperty({
    type: () => String,
    example: "Morgan",
  })
  lastName: string;

  @ApiProperty({
    type: () => Number,
    description: "search offset",
    example: 0,
  })
  @Type(() => Number)
  @Min(0)
  @IsInt()
  offset: number;

  @ApiProperty({
    type: () => Number,
    description: "search limit",
    example: 1,
  })
  @Type(() => Number)
  @Min(1)
  @IsInt()
  limit: number;

  @ApiProperty({
    type: () => [String],
    description: "booking status filter list",
    example: [
      BookingStatus.WAITING_FOR_GUIDE_CONFIRMATION,
      BookingStatus.WAITING_FOR_PAYMENT,
    ],
  })
  @IsArray()
  @IsString({ each: true })
  bookingStatusFilter: BookingStatus[];
}
