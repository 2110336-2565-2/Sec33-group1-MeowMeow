import { PickType } from "@nestjs/swagger";
import { Guide } from "./guide.dto";

export class GetGuideByUserIdRequest {}

export class GetGuideByUserIdResponse extends PickType(Guide, [
  "guideId",
  "userId",
  "firstName",
  "lastName",
  "certificateId",
  "averageReviewScore",
] as const) {}
