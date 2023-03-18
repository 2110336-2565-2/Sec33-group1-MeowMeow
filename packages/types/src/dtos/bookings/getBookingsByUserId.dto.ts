import { ApiProperty } from "@nestjs/swagger";

export class GetBookingsByUserIdRequest {
  @ApiProperty({
    type: () => Number,
    minimum: 1,
  })
  userId: number;
}

export class GetBookingsByUserIdResponse {
  results: {
    id: number;
    startDate: string;
    endDate: string;
    bookingStatus: string;
    postId: number;
  }[];
}
