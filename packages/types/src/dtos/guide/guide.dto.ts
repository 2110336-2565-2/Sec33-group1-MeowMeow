import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString } from "class-validator";

export class Guide {
  @ApiProperty({
    type: () => String,
    description: "return status message",
    example: "success",
  })
  @IsString()
  message: string;

  @ApiProperty({ type: () => Number, description: "guide id", example: 1 })
  @IsNumber()
  guideId: number;

  @ApiProperty({ type: () => Number, description: "user id", example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({
    type: () => String,
    description: "guide first name",
    example: "john",
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    type: () => String,
    description: "guide last name",
    example: "doe",
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    type: () => String,
    description: "guide certificate id",
    example: "9a5bb8cc-2af9-4057-8153-eaa8d4a2b0d1",
  })
  @IsString()
  certificateId: string;

  @ApiProperty({
    type: () => Number,
    description: "guide rating",
    example: 4.5,
  })
  @IsNumber()
  averageReviewScore: number;

  @ApiProperty({
    type: () => [String],
    description: "guide location",
    example: ["Bangkok", "Chiang Mai"],
  })
  @IsArray()
  @IsString({ each: true })
  locations: string[];

  @ApiProperty({
    type: () => [String],
    description: "guide tour style",
    example: ["Food", "Culture"],
  })
  @IsArray()
  @IsString({ each: true })
  tourStyles: string[];
}
