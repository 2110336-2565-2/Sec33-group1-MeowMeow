import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";
import { Post } from "./post.dto";

export class SearchPostsRequest extends PartialType(
  PickType(Post, ["locations", "fee", "tags"] as const)
) {
  @ApiProperty({
    type: () => Number,
    description: "search offset",
    example: 0,
  })
  @Type(() => Number)
  @Min(0)
  @IsInt()
  offset: number;

  @ApiProperty({
    type: () => Number,
    description: "search limit",
    example: 1,
  })
  @Type(() => Number)
  @Min(1)
  @IsInt()
  limit: number;

  @ApiProperty({
    type: () => Number,
    description: "minimum required participant",
    example: 5,
    required: false,
  })
  @Type(() => Number)
  @Min(1)
  @IsInt()
  @IsOptional()
  participant?: number;

  @ApiProperty({
    type: () => Number,
    description: "minimum required review score",
    example: 4.5,
    required: false,
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 })
  @Max(5)
  @Min(0)
  @IsOptional()
  reviewScore?: number;

  @ApiProperty({
    type: () => String,
    description: "search keyword",
    example: "keyword",
    required: false,
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  text?: string;
}

export class SearchPostsPost extends PickType(Post, [
  "id",
  "authorId",
  "title",
  "content",
  "tags",
  "locations",
  "fee",
  "maxParticipant",
  "contactInfo",
  "createdAt",
  "updatedAt",
] as const) {}

export class SearchPostsResponse {
  @ApiProperty({
    type: () => [SearchPostsPost],
    description: "posts that match criteria",
  })
  posts: SearchPostsPost[];

  @ApiProperty({
    type: () => Number,
    description: "number of posts that match criteria",
    example: 100,
  })
  @Type(() => Number)
  postsCount: number;
}
