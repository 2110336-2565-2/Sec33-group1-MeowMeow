export interface ITrip {
  id: number;
  name: string;
  price: number;
}
export interface IBooking {
  id: number;
  bookingStatus: string;
  startDate: string;
  endDate: string;
  post: ITrip;
}

export enum PaymentStatus {
  INITIAL = "INITIAL",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}
