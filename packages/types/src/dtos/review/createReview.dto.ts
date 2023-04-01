import { ApiProperty, PickType } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  Max,
  IsEmpty,
} from "class-validator";
import { Review } from "./review.dto";

export class CreateReviewRequest extends PickType(Review, [
  "guideId",
  "score",
  "text",
] as const) {}

export class CreateReviewResponse extends PickType(Review, [
  "guideId",
  "score",
  "text",
  "reviewerId",
  "id",
  "publishDate",
  "message",
] as const) {}
