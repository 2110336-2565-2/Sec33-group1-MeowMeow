import { IPaymentData } from "./recordType";
import { statusPaymentType } from "./statusHandle";

function createPaymentData(
  id: string,
  userID: string,
  guideID: string,
  timeStamp: string,
  price: number,
  paymentStatus: string
): IPaymentData {
  return {
    id,
    userID,
    guideID,
    timeStamp,
    price,
    paymentStatus,
  };
}

export const rows = [
  createPaymentData(
    "1",
    "user1-id",
    "guide1-id",
    "2020-01-01T10:30",
    100,
    statusPaymentType.TRAVELLER_PAID
  ),
  createPaymentData(
    "2",
    "user2-id",
    "guide2-id",
    "2020-02-02T10:30",
    88.88,
    statusPaymentType.WAITING_REFUND
  ),
  createPaymentData(
    "3",
    "user3-id",
    "guide3-id",
    "2020-03-03T10:30",
    44.55,
    statusPaymentType.REFUNDED
  ),
  createPaymentData(
    "4",
    "user4-id",
    "guide4-id",
    "2020-04-04T10:30",
    99.21,
    statusPaymentType.HOLDING
  ),
  createPaymentData(
    "5",
    "user5-id",
    "guide5-id",
    "2020-05-05T10:30",
    55,
    statusPaymentType.GUIDE_GET_PAID
  ),
];
