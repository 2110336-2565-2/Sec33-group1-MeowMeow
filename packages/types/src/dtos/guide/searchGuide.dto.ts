import { ApiProperty, ApiPropertyOptional, PickType } from "@nestjs/swagger";
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from "class-validator";
import { Type } from "class-transformer";
import { Guide } from "./guide.dto";

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

export class SearchGuidesGuideResponse extends PickType(Guide, [
  "guideId",
  "firstName",
  "lastName",
  "certificateId",
  "averageReviewScore",
] as const) {}

export type SearchGuidesResponse = SearchGuidesGuideResponse[];
