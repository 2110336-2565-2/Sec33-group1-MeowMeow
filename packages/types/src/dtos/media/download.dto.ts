import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class DownloadRequest {
  @ApiProperty({
    type: () => String,
    example: "9a5bb8cc-2af9-4057-8153-eaa8d4a2b0d1",
  })
  @IsUUID(4)
  id: string;
}

export class DownloadResponse {
  @ApiProperty({
    type: () => String,
    example: "success",
  })
  message: string;

  @ApiProperty({
    type: () => String,
    format: "binary",
  })
  file: Buffer;
}
