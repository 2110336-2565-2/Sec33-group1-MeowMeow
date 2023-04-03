import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Guide } from "./guide.dto";
import { GuideRegisterRequest } from "./guideRegister.dto";
import { IsArray, IsString } from "class-validator";

export class GuideUpdateRequest {
  @ApiProperty({
    type: () => [String],
    description: "guide location",
    example: ["Bangkok", "Chiang Mai"],
  })
  @IsArray()
  @IsString({ each: true })
  locations?: string[];

  @ApiProperty({
    type: () => [String],
    description: "guide tour style",
    example: ["Food", "Culture"],
  })
  @IsArray()
  @IsString({ each: true })
  tourStyles?: string[];
}

export class GuideUpdateResponse extends PickType(Guide, [
  "message",
  "guideId",
] as const) {}
