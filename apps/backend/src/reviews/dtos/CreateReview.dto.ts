import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  Max,
} from 'class-validator';

export class CreateReviewRequest {
  @IsInt()
  @IsNotEmpty()
  guideId: number;

  @IsInt()
  @IsNotEmpty()
  reviewerId: number;

  @Max(5)
  @Min(0)
  @IsNumber(
    { maxDecimalPlaces: 1 },
    {
      message: 'score must have one decimal place',
    },
  )
  @IsNotEmpty()
  score: number;

  @MaxLength(200)
  text: string;
}

export class CreateReviewResponse {
  message: string;
  id: number;
  guideId: number;
  reviewerId: number;
  score: number;
  text: string;
}
