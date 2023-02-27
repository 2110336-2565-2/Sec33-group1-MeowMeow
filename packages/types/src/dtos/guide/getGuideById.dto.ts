import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class GetGuideByIdRequest {
  @Type(() => Number)
  @IsInt()
  id: number;
}

export class GetGuideByIdResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  //   @ApiProperty()
  //   fee: number;
  @ApiProperty()
  certificate: string;
  @ApiProperty()
  averageReviewScore: number;
}
