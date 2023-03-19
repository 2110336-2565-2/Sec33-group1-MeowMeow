import theme from "@/config/theme";
import { IStatus } from "./recordType";

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

const WAITINGCOLOR = theme.palette.warning.main;
const TRAVELLINGCOLOR = theme.palette.info.main;
const FINISHEDCOLOR = theme.palette.success.main;
const CANCELCOLOR = theme.palette.error.main;

const subButtonName = {
  CANCEL: "Cancel",
  PAY: "Pay",
  REFUND: "Refund",
  REVIEW: "Review",
} as const;

export let buttonMapStatus = new Map<string, string[]>();
buttonMapStatus.set(statusType.WAITING_FOR_GUIDE, [subButtonName.CANCEL]);
buttonMapStatus.set(statusType.GUIDE_REJECTED, []);
buttonMapStatus.set(statusType.WAITING_FOR_PAYMENT, [
  subButtonName.PAY,
  subButtonName.CANCEL,
]);
buttonMapStatus.set(statusType.CANCEL_BOOKING, []);
buttonMapStatus.set(statusType.WAITING, [subButtonName.CANCEL]);
buttonMapStatus.set(statusType.WAITING_FOR_REFUND, []);
buttonMapStatus.set(statusType.CANCEL_TRAVEL, [subButtonName.REFUND]);
buttonMapStatus.set(statusType.TEAVELLING, []);
buttonMapStatus.set(statusType.WAITING_FOR_REVIEW, [
  subButtonName.REVIEW,
  subButtonName.REFUND,
]);
buttonMapStatus.set(statusType.FINISHED, []);

export let buttonMapLink = new Map<string, string>();
buttonMapLink.set(subButtonName.CANCEL, "/cancel-trip");
buttonMapLink.set(subButtonName.PAY, "/");
buttonMapLink.set(subButtonName.REFUND, "/");
buttonMapLink.set(subButtonName.REVIEW, "/guide-profile/1");

export let statusDetail = new Map<string, IStatus>();
statusDetail.set(statusType.WAITING_FOR_GUIDE, {
  description:
    "Waiting for guide to accept or reject your request for this trip",
  color: WAITINGCOLOR,
});
statusDetail.set(statusType.CANCEL_BOOKING, {
  description: "You are cancelled this trip",
  color: CANCELCOLOR,
});
statusDetail.set(statusType.GUIDE_REJECTED, {
  description: "Your guide is rejected your request, please try another trip",
  color: CANCELCOLOR,
});
statusDetail.set(statusType.WAITING_FOR_PAYMENT, {
  description:
    "Your guide is accepted your request, please pay for this trip within 24 hours",
  color: WAITINGCOLOR,
});
statusDetail.set(statusType.WAITING, {
  description: "Waiting for your trip to start",
  color: WAITINGCOLOR,
});
statusDetail.set(statusType.WAITING_FOR_REFUND, {
  description: "Waiting for refund, the system will refund you within 3 days",
  color: WAITINGCOLOR,
});
statusDetail.set(statusType.CANCEL_TRAVEL, {
  description:
    "You are cancelled this trip, please press the button to get refund",
  color: CANCELCOLOR,
});
statusDetail.set(statusType.TEAVELLING, {
  description: "You are travelling with this trip Enjoy!",
  color: TRAVELLINGCOLOR,
});
statusDetail.set(statusType.WAITING_FOR_REVIEW, {
  description:
    "Your trip is finished, please press the button to review your trip",
  color: WAITINGCOLOR,
});
statusDetail.set(statusType.FINISHED, {
  description: "Your trip is finished, thank you for your review",
  color: FINISHEDCOLOR,
});
