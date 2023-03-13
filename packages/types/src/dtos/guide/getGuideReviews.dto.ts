import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class GetGuideReviewsRequest {
  @Type(() => Number)
  @IsInt()
  id: number;

  @Type(() => Number)
  @IsInt()
  page: number;
}

export class GuideReview {
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

export class GetGuideReviewsResponse {
  @ApiProperty({ type: () => [GuideReview] })
  reviews: GuideReview[];
}
