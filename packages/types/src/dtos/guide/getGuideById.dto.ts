import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class GetGuideByIdRequest {
  @ApiProperty({ type: () => Number })
  @Type(() => Number)
  @IsInt()
  id: number;
}

export class GetGuideByIdResponse {
  @ApiProperty({ type: () => Number })
  id: number;
  @ApiProperty({ type: () => Number })
  userId: number;
  @ApiProperty({ type: () => String })
  firstName: string;
  @ApiProperty({ type: () => String })
  lastName: string;
  @ApiProperty({ type: () => String })
  certificate: string;
  @ApiProperty({ type: () => Number })
  averageReviewScore: number;
}
