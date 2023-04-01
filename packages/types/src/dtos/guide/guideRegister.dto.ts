import { ApiProperty, PickType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";
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
  certificateType: string;

  @ApiProperty({
    type: () => String,
    description: "tax id for payment",
    required: false,
  })
  @IsString()
  @IsOptional()
  taxId: string;

  @ApiProperty({
    type: () => String,
    description: "brand of bank account for payment",
    example: "bbl",
  })
  @IsString()
  brandBankAccount: string;

  @ApiProperty({
    type: () => String,
    description: " bank account number for payment",
    example: "acc12345",
  })
  @IsString()
  numberBankAccount: string;

  @ApiProperty({
    type: () => String,
    description: "bank account holder name.",
    example: "John Doe",
  })
  @IsString()
  nameBankAccount: string;
}

export class GuideRegisterResponse extends PickType(Guide, [
  "message",
  "guideId",
  "certificateId",
] as const) {}
