import { ApiProperty, PickType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsString } from "class-validator";
import { Guide } from "./guide.dto";

export class GuideRegisterRequest {
  @ApiProperty({
    type: () => [String],
    description: "guide location",
    example: ["Bangkok", "Chiang Mai"],
  })
  @Transform(({ value }) => value.toString().split(","), { toClassOnly: true })
  @IsArray()
  @IsString({ each: true })
  locations: string[];
  @ApiProperty({
    type: () => [String],
    description: "guide tour style",
    example: ["Food", "Culture"],
  })
  @Transform(({ value }) => value.toString().split(","), { toClassOnly: true })
  @IsArray()
  @IsString({ each: true })
  tourStyles: string[];
  @ApiProperty({
    type: () => String,
    format: "binary",
    description: "guide certificate image",
  })
  certificate: Buffer;
  @ApiProperty({
    type: () => String,
    description: "guide payment id",
    example: "1234567890",
  })
  @IsString()
  paymentId: string;
}

export class GuideRegisterResponse extends PickType(Guide, [
  "message",
  "guideId",
  "certificateId",
] as const) {}
