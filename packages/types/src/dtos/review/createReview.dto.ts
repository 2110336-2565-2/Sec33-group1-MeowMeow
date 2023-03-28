import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  Max,
  IsEmpty,
} from "class-validator";

export class CreateReviewRequest {
  @ApiProperty({ type: () => Number })
  @IsInt()
  @IsNotEmpty()
  guideId: number;

  @ApiProperty({ type: () => Number })
  @Max(5)
  @Min(0)
  @IsNumber(
    { maxDecimalPlaces: 1 },
    {
      message: "score must have one decimal place",
    }
  )
  @IsNotEmpty()
  score: number;

  @ApiProperty({ type: () => String })
  @MaxLength(200)
  text: string;

  @IsEmpty()
  reviewerId: number;
}

export class CreateReviewResponse {
  @ApiProperty({ type: () => String })
  message: string;
  @ApiProperty({ type: () => Number })
  id: number;
  @ApiProperty({ type: () => Number })
  guideId: number;
  @ApiProperty({ type: () => Number })
  reviewerId: number;
  @ApiProperty({ type: () => Number })
  score: number;
  @ApiProperty({ type: () => String })
  text: string;
}
