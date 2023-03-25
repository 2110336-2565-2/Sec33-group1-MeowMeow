import { ApiProperty } from "@nestjs/swagger";

export class Guide {
  @ApiProperty({
    type: () => String,
    description: "return status message",
    example: "success",
  })
  message: string;
  @ApiProperty({ type: () => Number, description: "guide id", example: 1 })
  guideId: number;
  @ApiProperty({ type: () => Number, description: "user id", example: 1 })
  userId: number;
  @ApiProperty({
    type: () => String,
    description: "guide first name",
    example: "john",
  })
  firstName: string;
  @ApiProperty({
    type: () => String,
    description: "guide last name",
    example: "doe",
  })
  lastName: string;
  @ApiProperty({
    type: () => String,
    description: "guide certificate id",
    example: "9a5bb8cc-2af9-4057-8153-eaa8d4a2b0d1",
  })
  certificateId: string;
  @ApiProperty({
    type: () => Number,
    description: "guide rating",
    example: 4.5,
  })
  averageReviewScore: number;
}
