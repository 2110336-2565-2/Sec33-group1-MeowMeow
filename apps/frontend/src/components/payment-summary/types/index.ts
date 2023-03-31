export interface Trip {
  id: string;
  name: string;
  price: number;
}

export enum PaymentStatus {
  INITIAL = "INITIAL",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}
