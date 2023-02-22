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

const buttonName = {
  CANCEL: "Cancel",
  PAY: "Pay",
  REFUND: "Refund",
  REVIEW: "Review",
} as const;

export let buttonMapping = new Map<string, string[]>();
buttonMapping.set(statusType.WAITING_FOR_GUIDE, [buttonName.CANCEL]);
buttonMapping.set(statusType.GUIDE_REJECTED, []);
buttonMapping.set(statusType.WAITING_FOR_PAYMENT, [
  buttonName.PAY,
  buttonName.CANCEL,
]);
buttonMapping.set(statusType.CANCEL_BOOKING, []);
buttonMapping.set(statusType.WAITING, [buttonName.CANCEL]);
buttonMapping.set(statusType.WAITING_FOR_REFUND, []);
buttonMapping.set(statusType.CANCEL_TRAVEL, []);
buttonMapping.set(statusType.TEAVELLING, []);
buttonMapping.set(statusType.WAITING_FOR_REVIEW, [
  buttonName.REVIEW,
  buttonName.REFUND,
]);
buttonMapping.set(statusType.FINISHED, []);

export type Order = "asc" | "desc";
