import { ApiProperty, PickType } from "@nestjs/swagger";
import { Guide } from "./guide.dto";

export class GetGuideByIdResponse extends PickType(Guide, [
  "guideId",
  "userId",
  "firstName",
  "lastName",
  "certificateId",
  "averageReviewScore",
  "locations",
  "tourStyles",
] as const) {
  @ApiProperty({
    type: () => String,
    description: "guide image",
    example: "hello.jpg",
  })
  imageId: string;
}
