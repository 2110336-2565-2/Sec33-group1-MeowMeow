import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";

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
  id: number;

  @ApiProperty({
    type: () => Number,
    description: "post's author id",
    example: 1,
  })
  authorId: number;

  @ApiProperty({
    type: () => String,
    description: "title of the post",
    example: "post's title",
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: () => String,
    description: "content of the post",
    example:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  })
  @IsOptional()
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
  tags: string[];

  @ApiProperty({
    type: () => Date,
    description: "post created timestamp",
    example: new Date("2022-03-27"),
  })
  createdAt: Date;

  @ApiProperty({
    type: () => Date,
    description: "post updated timestamp",
    example: new Date("2022-03-27"),
  })
  updatedAt: Date;
}
