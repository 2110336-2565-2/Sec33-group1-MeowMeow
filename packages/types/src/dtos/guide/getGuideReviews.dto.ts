import { ApiProperty, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";
import { Guide } from "./guide.dto";

class GuideReview extends PickType(Guide, ["guideId"] as const) {
  @ApiProperty({ type: () => Number })
  reviewId: number;
  @ApiProperty({ type: () => Number })
  reviewerId: number;
  @ApiProperty({ type: () => Number })
  score: number;
  @ApiProperty({ type: () => String })
  text: string;
  @ApiProperty({ type: () => Date })
  publishDate: Date;
}

export class GetGuideReviewsRequest {
  @Type(() => Number)
  @IsInt()
  id: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;
}

export type GetGuideReviewsResponse = GuideReview[];
