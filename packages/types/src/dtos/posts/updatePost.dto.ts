import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from "class-validator";

export class UpdatePostRequest {
  // Todo: Implement this

  @IsOptional()
  title: string;

  @IsOptional()
  content: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Max(99999999.99)
  @Min(0)
  fee: number;

  @IsOptional()
  tags: string[];
}

export class UpdatePostResponse {
  // Todo: Implement this
  message: string;
  formerPost: post;
  updatedPost: post;
}

class post {
  id: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  tags: string[];
  fee: number;
}
