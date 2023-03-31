import theme from "@/config/theme";
import { BookingStatus } from "../../../../../../packages/database/src";
import { IStatus } from "./recordType";

// export enum statusType {
//   WAITING_FOR_GUIDE_CONFIRMATION = "Waiting for guide confirmation",
//   GUIDE_CANCELLED = "GUIDE_CANCELLED",
//   USER_CANCELLED = "USER_CANCELLED",
//   WAITING_FOR_PAYMENT = "WAITING_FOR_PAYMENT",
//   WAITING_FOR_REFUND_USER = "WAITING_FOR_REFUND_USER",
//   WAITING_FOR_REFUND_GUIDE = "WAITING_FOR_REFUND_GUIDE",
//   WAITING_FOR_TRAVELING = "WAITING_FOR_TRAVELING",
//   TRAVELING = "TRAVELING",
//   FINISHED = "FINISHED",
// }

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

export let buttonDisplayNames = new Map<string, string>();
buttonDisplayNames.set(BookingStatus.FINISHED, "Finish");
buttonDisplayNames.set(BookingStatus.TRAVELING, "Traveling");
buttonDisplayNames.set(BookingStatus.WAITING_FOR_TRAVELING, "Waiting");
buttonDisplayNames.set(BookingStatus.WAITING_FOR_PAYMENT, "Waiting");
buttonDisplayNames.set(BookingStatus.GUIDE_CANCELLED, "Cancelled");
buttonDisplayNames.set(BookingStatus.USER_CANCELLED, "Cancelled");
// buttonDisplayNames.set(BookingStatus.WAITING_FOR_REFUND_USER, "Waiting");      // Update
// buttonDisplayNames.set(BookingStatus.WAITING_FOR_REFUND_GUIDE, "Waiting");
buttonDisplayNames.set(BookingStatus.WAITING_FOR_GUIDE_CONFIRMATION, "Waiting");

export let buttonMapStatus = new Map<string, string[]>();
buttonMapStatus.set(BookingStatus.WAITING_FOR_GUIDE_CONFIRMATION, [
  subButtonName.CANCEL,
]);
buttonMapStatus.set(BookingStatus.GUIDE_CANCELLED, []);
buttonMapStatus.set(BookingStatus.WAITING_FOR_PAYMENT, [
  subButtonName.PAY,
  subButtonName.CANCEL,
]);
buttonMapStatus.set(BookingStatus.USER_CANCELLED, []);
buttonMapStatus.set(BookingStatus.WAITING_FOR_TRAVELING, [
  subButtonName.CANCEL,
]);
// buttonMapStatus.set(BookingStatus.WAITING_FOR_REFUND_USER, []);      // Update
// buttonMapStatus.set(BookingStatus.WAITING_FOR_REFUND_GUIDE, []);
buttonMapStatus.set(BookingStatus.TRAVELING, []);
buttonMapStatus.set(BookingStatus.FINISHED, []);

export let buttonMapLink = new Map<string, string>();
buttonMapLink.set(subButtonName.CANCEL, "/cancel-trip");
buttonMapLink.set(subButtonName.PAY, "/");
buttonMapLink.set(subButtonName.REFUND, "/");
buttonMapLink.set(subButtonName.REVIEW, "/guide-profile/1");

export let statusDetail = new Map<string, IStatus>();
statusDetail.set(BookingStatus.WAITING_FOR_GUIDE_CONFIRMATION, {
  description:
    "Waiting for guide to accept or reject your request for this trip",
  color: WAITINGCOLOR,
});
statusDetail.set(BookingStatus.USER_CANCELLED, {
  description: "You are cancelled this trip",
  color: CANCELCOLOR,
});
statusDetail.set(BookingStatus.GUIDE_CANCELLED, {
  description: "Your guide is rejected your request, please try another trip",
  color: CANCELCOLOR,
});
statusDetail.set(BookingStatus.WAITING_FOR_PAYMENT, {
  description:
    "Your guide is accepted your request, please pay for this trip within 24 hours",
  color: WAITINGCOLOR,
});
statusDetail.set(BookingStatus.WAITING_FOR_TRAVELING, {
  description: "Waiting for your trip to start. Hold on!",
  color: WAITINGCOLOR,
});
// statusDetail.set(BookingStatus.WAITING_FOR_REFUND_USER, {      // Update
//   description: "You cancelled this trip, waiting for refund",
//   color: WAITINGCOLOR,
// });
// statusDetail.set(BookingStatus.WAITING_FOR_REFUND_GUIDE, {
//   description: "Guide cancelled this trip, waiting for refund",
//   color: WAITINGCOLOR,
// });
statusDetail.set(BookingStatus.TRAVELING, {
  description: "You are travelling with this trip Enjoy!",
  color: TRAVELLINGCOLOR,
});
statusDetail.set(BookingStatus.FINISHED, {
  description: "Your trip is finished. Thank you for using our service!",
  color: FINISHEDCOLOR,
});
