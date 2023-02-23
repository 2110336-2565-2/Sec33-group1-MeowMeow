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
buttonMapping.set(statusType.CANCEL_TRAVEL, [buttonName.REFUND]);
buttonMapping.set(statusType.TEAVELLING, []);
buttonMapping.set(statusType.WAITING_FOR_REVIEW, [
  buttonName.REVIEW,
  buttonName.REFUND,
]);
buttonMapping.set(statusType.FINISHED, []);

export let statusDescription = new Map<string, string>();
statusDescription.set(
  statusType.WAITING_FOR_GUIDE,
  "Waiting for guide to accept or reject your request for this trip"
);
statusDescription.set(statusType.CANCEL_BOOKING, "You are cancelled this trip");
statusDescription.set(
  statusType.GUIDE_REJECTED,
  "Your trip has been rejected by the guide"
);
statusDescription.set(
  statusType.WAITING_FOR_PAYMENT,
  "Your guide is accepted your request, please pay for this trip within 24 hours"
);
statusDescription.set(
  statusType.WAITING,
  "Your payment is successful, waiting for the trip to start"
);
statusDescription.set(
  statusType.WAITING_FOR_REFUND,
  "Waiting for refund, the system will refund you within 3 days"
);
statusDescription.set(
  statusType.CANCEL_TRAVEL,
  "You are cancelled this trip, please press the button to get refund"
);
statusDescription.set(
  statusType.TEAVELLING,
  "You are travelling with this trip Enjoy!"
);
statusDescription.set(
  statusType.WAITING_FOR_REVIEW,
  "Your trip is finished, please press the button to review your trip"
);
statusDescription.set(
  statusType.FINISHED,
  "Thank you for your review, we hope you have a great trip with us"
);

export type Order = "asc" | "desc";
