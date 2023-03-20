import { IData } from "./recordType";
import { statusType } from "./statusHandle";

function createData(
  id: string,
  userID: string,
  guideID: string,
  timeStamp: string,
  price: number,
  paymentStatus: string
): IData {
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
  createData(
    "1",
    "user1-id",
    "guide1-id",
    "2020-01-01T10:30",
    100,
    statusType.TRAVELLER_PAID
  ),
  createData(
    "2",
    "user2-id",
    "guide2-id",
    "2020-02-02T10:30",
    88.88,
    statusType.WAITING_REFUND
  ),
  createData(
    "3",
    "user3-id",
    "guide3-id",
    "2020-03-03T10:30",
    44.55,
    statusType.REFUNDED
  ),
  createData(
    "4",
    "user4-id",
    "guide4-id",
    "2020-04-04T10:30",
    99.21,
    statusType.HOLDING
  ),
  createData(
    "5",
    "user5-id",
    "guide5-id",
    "2020-05-05T10:30",
    55,
    statusType.GUIDE_GET_PAID
  ),
];
