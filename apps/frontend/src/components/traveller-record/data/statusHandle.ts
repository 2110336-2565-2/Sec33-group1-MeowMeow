import theme from "@/config/theme";
import { IStatus } from "./recordType";

export enum statusType {
  WAITING_FOR_GUIDE_CONFIRMATION = "Waiting for guide confirmation",
  GUIDE_CANCELLED = "Guide cancelled",
  USER_CANCELLED = "User cancelled",
  WAITING_FOR_PAYMENT = "Waiting for payment",
  WAITING_FOR_REFUND_USER = "Waiting for refund (canceled by user)",
  WAITING_FOR_REFUND_GUIDE = "Waiting for refund (canceled by guide)",
  WAITING_FOR_TRAVELING = "Waiting for traveling",
  TRAVELING = "Traveling",
  FINISHED = "Finished",
}

const WAITINGCOLOR = theme.palette.warning.main;
const TRAVELLINGCOLOR = theme.palette.info.main;
const FINISHEDCOLOR = theme.palette.success.main;
const CANCELCOLOR = theme.palette.error.main;

export const subButtonName = {
  CANCEL: "Cancel",
  PAY: "Pay",
  REFUND: "Refund",
  REVIEW: "Review",
} as const;

export let buttonMapStatus = new Map<string, string[]>();
buttonMapStatus.set(statusType.WAITING_FOR_GUIDE_CONFIRMATION, [
  subButtonName.CANCEL,
]);
buttonMapStatus.set(statusType.GUIDE_CANCELLED, []);
buttonMapStatus.set(statusType.WAITING_FOR_PAYMENT, [
  subButtonName.PAY,
  subButtonName.CANCEL,
]);
buttonMapStatus.set(statusType.USER_CANCELLED, []);
buttonMapStatus.set(statusType.WAITING_FOR_TRAVELING, [subButtonName.CANCEL]);
buttonMapStatus.set(statusType.WAITING_FOR_REFUND_USER, []);
buttonMapStatus.set(statusType.WAITING_FOR_REFUND_GUIDE, []);
buttonMapStatus.set(statusType.TRAVELING, []);
buttonMapStatus.set(statusType.FINISHED, []);

export let buttonMapLink = new Map<string, string>();
buttonMapLink.set(subButtonName.CANCEL, "/cancel-trip");
buttonMapLink.set(subButtonName.PAY, "/");
buttonMapLink.set(subButtonName.REFUND, "/");
buttonMapLink.set(subButtonName.REVIEW, "/guide-profile/1");

export let statusDetail = new Map<string, IStatus>();
statusDetail.set(statusType.WAITING_FOR_GUIDE_CONFIRMATION, {
  description:
    "Waiting for guide to accept or reject your request for this trip",
  color: WAITINGCOLOR,
});
statusDetail.set(statusType.USER_CANCELLED, {
  description: "You are cancelled this trip",
  color: CANCELCOLOR,
});
statusDetail.set(statusType.GUIDE_CANCELLED, {
  description: "Your guide is rejected your request, please try another trip",
  color: CANCELCOLOR,
});
statusDetail.set(statusType.WAITING_FOR_PAYMENT, {
  description:
    "Your guide is accepted your request, please pay for this trip within 24 hours",
  color: WAITINGCOLOR,
});
statusDetail.set(statusType.WAITING_FOR_TRAVELING, {
  description: "Waiting for your trip to start",
  color: WAITINGCOLOR,
});
statusDetail.set(statusType.WAITING_FOR_REFUND_USER, {
  description: "You cancelled this trip, waiting for refund",
  color: WAITINGCOLOR,
});
statusDetail.set(statusType.WAITING_FOR_REFUND_GUIDE, {
  description: "Guide cancelled this trip, waiting for refund",
  color: WAITINGCOLOR,
});
statusDetail.set(statusType.TRAVELING, {
  description: "You are travelling with this trip Enjoy!",
  color: TRAVELLINGCOLOR,
});
statusDetail.set(statusType.FINISHED, {
  description: "Your trip is finished.",
  color: FINISHEDCOLOR,
});
