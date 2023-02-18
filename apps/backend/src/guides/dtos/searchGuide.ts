import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SearchGuidesRequest {
  @Type(() => Number)
  @Min(0)
  @IsInt()
  offset: number;

  @Type(() => Number)
  @Min(1)
  @IsInt()
  limit: number;

  @IsOptional()
  location?: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Max(99999999.99)
  @Min(0)
  @IsOptional()
  fee?: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 })
  @Max(5)
  @Min(0)
  @IsOptional()
  reviewScore?: number;

  @IsDateString()
  @IsOptional()
  datetime?: string;
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
