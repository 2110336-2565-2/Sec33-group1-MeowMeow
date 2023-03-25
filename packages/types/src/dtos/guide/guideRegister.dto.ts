import { ApiProperty, PickType } from "@nestjs/swagger";
import { Guide } from "./guide.dto";

export class GuideRegisterRequest {
  @ApiProperty({
    type: () => String,
    description: "guide location",
    example: ["Bangkok", "Chiang Mai"],
  })
  location: string[];
  @ApiProperty({
    type: () => String,
    description: "guide tour style",
    example: ["Food", "Culture"],
  })
  tourStyle: string[];
  @ApiProperty({
    type: () => String,
    format: "binary",
    description: "guide certificate image",
  })
  certificate: Buffer;
}

export class GuideRegisterResponse extends PickType(Guide, [
  "message",
  "guideId",
  "certificateId",
] as const) {}
