import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  guideID: string;
  @IsNotEmpty()
  touristID: string;
  @IsNumber()
  rating: number;
  comment: string;
}
