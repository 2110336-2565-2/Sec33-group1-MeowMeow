import { ApiProperty } from "@nestjs/swagger";

export class CreateBookingRequest {
  @ApiProperty({ type: () => String })
  startDate: string;

  @ApiProperty({ type: () => String })
  endDate: string;

  userId: number;

  @ApiProperty({ type: () => String })
  postId: number;

  @ApiProperty({ type: () => String })
  guideId: number;
}

export class CreateBookingResponse {
  id: number;
  startDate: string;
  endDate: string;
  bookingStatus: string;
  userId: number;
  postId: number;
}
