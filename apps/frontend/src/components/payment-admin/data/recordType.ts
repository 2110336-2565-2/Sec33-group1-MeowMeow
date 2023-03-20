export interface IData {
  id: string;
  userID: string;
  guideID: string;
  timeStamp: string;
  price: number;
  paymentStatus: string;
}

export interface IStatus {
  description: string;
  color: string;
}

export type Order = "asc" | "desc";
