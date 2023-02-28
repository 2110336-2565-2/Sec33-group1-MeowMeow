import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from "class-validator";

export class CreatePostRequest {
  // Todo: Implement this
  @IsInt()
  @IsNotEmpty()
  authorId: number;

  @IsNotEmpty()
  @IsDateString()
  postTime: string;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  content: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Max(99999999.99)
  @Min(0)
  fee: number;

  @IsOptional()
  tags: string[];
}

export class CreatePostResponse {
  // Todo: Implement this
  id: number;
  authorId: number;
  authorName: string;
  createdAt: string;
  title: string;
  content: string;
  tags: string[];
  fee: number;
}
