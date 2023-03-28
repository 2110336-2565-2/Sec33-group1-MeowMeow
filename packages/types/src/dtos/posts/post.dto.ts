import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class Post {
  @ApiProperty({
    type: () => String,
    description: "status message",
    example: "success",
  })
  message: string;

  @ApiProperty({
    type: () => Number,
    description: "id of the post",
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: () => Number,
    description: "post's author id",
    example: 1,
  })
  @IsNumber()
  authorId: number;

  @ApiProperty({
    type: () => String,
    description: "title of the post",
    example: "post's title",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: () => String,
    description: "content of the post",
    example:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    type: () => Number,
    description: "service's fee",
    example: 1.23,
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Max(99999999.99)
  @Min(0)
  fee: number;

  @ApiProperty({
    type: () => [String],
    description: "tags of the post",
    example: ["tag1", "tag2"],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({
    type: () => [String],
    description: "location of the post",
    example: ["Bangkok", "Chiang Mai"],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  locations: string[];

  @ApiProperty({
    type: () => Number,
    description: "maximum number of participants",
    example: 1,
  })
  @IsNumber()
  maxParticipant: number;

  @ApiProperty({
    type: () => String,
    description: "post's author contact info",
    example:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  })
  @IsString()
  contactInfo: string;

  @ApiProperty({
    type: () => Date,
    description: "post created timestamp",
    example: new Date("2022-03-27"),
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    type: () => Date,
    description: "post updated timestamp",
    example: new Date("2022-03-27"),
  })
  @IsDateString()
  updatedAt: Date;
}
