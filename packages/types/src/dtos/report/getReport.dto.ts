import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Report } from "./report.dto";
import { Type } from "class-transformer";
import { IsArray, IsEnum, Min, IsInt, IsOptional } from "class-validator";
import { ReportType } from "database";

export class SearchReportsRequest {
  @ApiProperty({
    type: () => [ReportType],
    description: "List of report type for filter",
    isArray: true,
    enum: ReportType,
  })
  @IsOptional()
  @IsEnum(ReportType, { each: true })
  reportTypeFilter?: ReportType[];

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
}

export class SearchReportsResponse {
  @ApiProperty({
    type: () => [Report],
    description: "all report that match the filter",
  })
  reports: Report[];

  @ApiProperty({
    type: () => Number,
    description: "number of reports that match the filter",
    example: 1,
  })
  reportsCount: number;
}
