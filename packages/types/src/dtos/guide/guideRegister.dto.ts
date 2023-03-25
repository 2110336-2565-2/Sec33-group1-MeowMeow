import { ApiProperty } from "@nestjs/swagger";

export class GuideRegisterRequest {
  @ApiProperty({
    type: () => String,
    description: "guide location",
    example: ["Bangkok", "Chiang Mai"],
  })
  location: string[];
  @ApiProperty({
    type: () => String,
    description: "guide tour style",
    example: ["Food", "Culture"],
  })
  tourStyle: string[];
  @ApiProperty({
    type: () => String,
    format: "binary",
    description: "guide certificate image",
  })
  certificate: Buffer;
}

export class GuideRegisterResponse {
  @ApiProperty({
    type: () => String,
    description: "status message",
    example: "success",
  })
  message: string;
  @ApiProperty({
    type: () => Number,
    description: "guide id",
    example: 1,
  })
  guideId: number;
  @ApiProperty({
    type: () => String,
    description: "upload certificate id",
    example: "9a5bb8cc-2af9-4057-8153-eaa8d4a2b0d1",
  })
  certificateId: string;
}
