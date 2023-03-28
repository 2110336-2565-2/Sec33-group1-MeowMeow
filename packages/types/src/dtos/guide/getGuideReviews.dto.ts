import { ApiProperty, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";
import { Guide } from "./guide.dto";

class GuideReview extends PickType(Guide, ["guideId"] as const) {
  @ApiProperty({ type: () => Number, description: "review id", example: 1 })
  reviewId: number;
  @ApiProperty({
    type: () => Number,
    description: "reviewer id",
    example: 1,
  })
  reviewerId: number;
  @ApiProperty({
    type: () => Number,
    description: "review score",
    example: 4.5,
  })
  score: number;
  @ApiProperty({
    type: () => String,
    description: "review text",
    example: "LGTM!",
  })
  text: string;
  @ApiProperty({
    type: () => Date,
    description: "publish date",
    example: new Date("2022-03-27"),
  })
  publishDate: Date;
}

export type GetGuideReviewsResponse = GuideReview[];
