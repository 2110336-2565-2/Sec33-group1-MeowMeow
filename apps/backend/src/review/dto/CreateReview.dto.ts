import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  guideID: string;

  @IsNotEmpty()
  touristID: string;

  @IsNumber()
  rating: number;

  @MaxLength(200)
  comment: string;
}
