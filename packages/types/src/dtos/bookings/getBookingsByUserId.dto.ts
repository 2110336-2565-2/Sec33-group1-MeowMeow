export class GetBookingsByUserIdRequest {
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
