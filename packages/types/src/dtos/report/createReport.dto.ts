import { PickType } from "@nestjs/swagger";
import { Report } from "./report.dto";

export class CreateReportRequest extends PickType(Report, [
  "reportType",
  "text",
] as const) {}

export class CreateReportResponse extends PickType(Report, [
  "id",
  "createdAt",
  "reportType",
  "text",
  "reporterId",
  "message",
] as const) {}
