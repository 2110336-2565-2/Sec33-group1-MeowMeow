export interface IData {
  name: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  participant: number;
  price: number;
  lineid: string;
  status: statusType;
}

export enum statusType {
  WAITING_FOR_GUIDE = "waiting for guide",
  GUIDE_REJECTED = "guide rejected",
  WAITING_FOR_PAYMENT = "waiting for payment",
  CANCEL_BOOKING = "cancel booking",
  WAITING = "waiting",
  WAITING_FOR_REFUND = "waiting for refund",
  CANCEL_TRAVEL = "cancel travel",
  TEAVELLING = "travelling",
  WAITING_FOR_REVIEW = "waiting for review",
  FINISHED = "finished",
}

export type Order = "asc" | "desc";
