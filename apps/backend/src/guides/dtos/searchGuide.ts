import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class SearchGuidesRequest {
  @ApiProperty()
  @Min(0)
  @IsInt()
  offset: number;

  @ApiProperty()
  @Min(1)
  @IsInt()
  limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  location: string;

  @ApiPropertyOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Max(99999999.99)
  @IsOptional()
  fee: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Max(99999999.99)
  @IsOptional()
  reviewScore: number;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  datetime: string;
}

export class SearchGuidesGuideResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  fee: number;
  @ApiProperty()
  certificate: string;
  @ApiProperty()
  averageReviewScore: number;
}

export class SearchGuidesResponse {
  @ApiProperty({ isArray: true, type: SearchGuidesGuideResponse })
  results: SearchGuidesGuideResponse[];
}
