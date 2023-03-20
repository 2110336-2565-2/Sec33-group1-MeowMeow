export interface IPaymentData {
  id: string;
  userID: string;
  guideID: string;
  timeStamp: string;
  price: number;
  paymentStatus: string;
}

export type Order = "asc" | "desc";
