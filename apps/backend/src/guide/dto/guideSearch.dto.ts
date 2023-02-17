import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class GuideSearchRequest {
  @Min(0)
  @IsInt()
  offset: number;

  @Min(1)
  @IsInt()
  limit: number;

  @IsOptional()
  location: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Max(99999999.99)
  @IsOptional()
  fee: number;

  @IsNumber()
  @Max(99999999.99)
  @IsOptional()
  reviewScore: number;

  @IsDateString()
  @IsOptional()
  datetime: string;
}

export class GuideSearchResponse {
  results: {
    id: number;
    firstName: string;
    lastName: string;
    fee: number;
    certificate: string;
    averageReviewScore: number;
  }[];
}
