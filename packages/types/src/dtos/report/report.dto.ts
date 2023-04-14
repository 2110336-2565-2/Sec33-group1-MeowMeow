import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  Min,
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
    type: () => Date,
    description:
      "Timestamp of the report. Value is the current time by default.",
    example: new Date("2023-10-10"),
  })
  @IsString()
  @IsEnum(ReportType)
  reportType: ReportType;

  @ApiProperty({
    type: () => String,
    description: "Describe the report",
    example: "I don't like this guide, Tommy, id 3. He's rude.",
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
    description: "List of report type for filter",
    isArray: true,
    enum: ReportType,
  })
  @IsArray()
  @IsEnum(ReportType, { each: true })
  reportTypeFilter: ReportType[];

  @ApiProperty({
    type: () => Number,
    description: "report searching offset",
    example: 0,
  })
  @Type(() => Number)
  @Min(0)
  @IsInt()
  offset: number;

  @ApiProperty({
    type: () => Number,
    description: "report searching limit",
    example: 1,
  })
  @Type(() => Number)
  @Min(1)
  @IsInt()
  limit: number;

  @ApiProperty({
    type: () => String,
    description: "return status message",
    example: "success",
  })
  message: string;
}
