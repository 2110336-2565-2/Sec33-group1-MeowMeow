import { ApiProperty, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";
import { Guide } from "./guide.dto";

export class GetGuideByIdRequest {
  @ApiProperty({ type: () => Number, description: "guide id", example: 1 })
  @Type(() => Number)
  @IsInt()
  id: number;
}

export class GetGuideByIdResponse extends PickType(Guide, [
  "guideId",
  "userId",
  "firstName",
  "lastName",
  "certificateId",
  "averageReviewScore",
] as const) {}
