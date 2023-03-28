import { ApiProperty } from "@nestjs/swagger";

export class UploadRequest {
  @ApiProperty({
    type: () => String,
    format: "binary",
  })
  file: Buffer;
}

export class UploadResponse {
  @ApiProperty({
    type: () => String,
    example: "success",
  })
  message: string;

  @ApiProperty({
    type: () => String,
    example: "9a5bb8cc-2af9-4057-8153-eaa8d4a2b0d1",
  })
  id: string;
}
