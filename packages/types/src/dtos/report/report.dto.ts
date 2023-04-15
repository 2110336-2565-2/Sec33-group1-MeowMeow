import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";
import { ReportType } from "database";

export class Report {
  @ApiProperty({
    type: () => Number,
    description: "ID of the report",
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    type: () => Date,
    description:
      "Timestamp of the report. Value is the current time by default.",
    example: new Date("2023-10-10"),
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    type: () => ReportType,
    description: "Type of report",
    enum: ReportType,
    example: ReportType.GUIDE,
  })
  @IsString()
  @IsEnum(ReportType)
  reportType: ReportType;

  @ApiProperty({
    type: () => String,
    description: "Describe the report",
    example: "I don't like this guide, John Doe. He's rude.",
  })
  @IsString()
  text: string;

  @ApiProperty({
    type: () => Number,
    description: "user ID of the reporter",
    example: 2,
  })
  @IsInt()
  reporterId: number;

  @ApiProperty({
    type: () => Number,
    description: "Guide ID of the guide to be reported",
    example: 2,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  guideId?: number;

  @ApiProperty({
    type: () => Number,
    description: "Post ID of the trip to be reported",
    example: 2,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  postId?: number;
}
