import { ApiProperty, PickType } from "@nestjs/swagger";
import { Report } from "./report.dto";

export class CreateReportRequest extends PickType(Report, [
  "reportType",
  "text",
  "postId",
  "guideId",
] as const) {}

export class CreateReportResponse extends PickType(Report, [
  "id",
  "createdAt",
  "reportType",
  "text",
  "reporterId",
  "postId",
  "guideId",
] as const) {
  @ApiProperty({
    type: () => String,
    description: "return status message",
    example: "success",
  })
  message: string;
}
