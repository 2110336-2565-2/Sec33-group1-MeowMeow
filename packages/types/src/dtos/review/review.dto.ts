import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  Max,
} from "class-validator";

export class Review {
  @ApiProperty({
    type: () => Number,
    description: "id of guide to be reviewed",
    example: 7,
  })
  @IsInt()
  @IsNotEmpty()
  guideId: number;

  @ApiProperty({
    type: () => Number,
    description:
      "Score of the review. Must be between 0 and 5 AND have one decimal place.",
    example: 4.5,
  })
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

  @ApiProperty({
    type: () => String,
    description: "Content of the review",
    maxLength: 200,
    example: "The guide was nice and friendly.",
  })
  @MaxLength(200)
  text: string;

  @ApiProperty({
    type: () => Number,
    description: "id of the reviewer",
    example: 8,
  })
  reviewerId: number;

  @ApiProperty({
    type: () => Date,
    description: "review published date",
    example: new Date("2024-04-01"),
  })
  publishDate: Date;

  @ApiProperty({
    type: () => Number,
    description: "id of the review",
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    type: () => String,
    description: "status message response",
    example: "success",
  })
  message: string;
}
