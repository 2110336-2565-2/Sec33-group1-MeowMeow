import { ITravellerData } from "./recordType";
import { statusType } from "./statusHandle";

function createData(
  id: string,
  name: string,
  location: string,
  description: string,
  startDate: string,
  endDate: string,
  participant: number,
  price: number,
  lineid: string,
  status: statusType
): ITravellerData {
  return {
    id,
    name,
    location,
    description,
    startDate,
    endDate,
    participant,
    price,
    lineid,
    status,
  };
}

export const rows = [
  createData(
    "1",
    "Camping 1",
    "Chiang Mai",
    "Camping in Chiang Mai",
    "2020-01-01T10:30",
    "2020-01-02T10:30",
    2,
    50.55,
    "lineid 1",
    statusType.WAITING_FOR_GUIDE
  ),
  createData(
    "2",
    "Camping 2",
    "Bangkok",
    "Camping in Bangkok",
    "2020-01-11T10:30",
    "2020-01-12T10:30",
    2,
    44.22,
    "lineid 2",
    statusType.GUIDE_REJECTED
  ),
  createData(
    "3",
    "Camping 3",
    "Pathumthani",
    "Camping in Pathumthani",
    "2020-01-01T10:30",
    "2020-01-02T10:30",
    2,
    99.12,
    "lineid 3",
    statusType.WAITING_FOR_PAYMENT
  ),
  createData(
    "4",
    "Camping 4",
    "Chiang Rai",
    "Camping in Chiang Rai",
    "2020-11-01T10:30",
    "2020-01-12T10:30",
    2,
    509.1,
    "lineid 4",
    statusType.CANCEL_BOOKING
  ),
  createData(
    "5",
    "Camping 5",
    "Rayong",
    "Camping in Rayong",
    "2020-01-01T10:30",
    "2020-01-02T10:30",
    2,
    235,
    "lineid 5",
    statusType.WAITING
  ),
  createData(
    "6",
    "Camping 6",
    "Trad",
    "Camping in Trad",
    "2020-01-01T10:30",
    "2020-01-02T10:30",
    2,
    100.4,
    "lineid 6",
    statusType.WAITING_FOR_REFUND
  ),
  createData(
    "7",
    "Camping 7",
    "Chiang Mai",
    "Camping in Chiang Mai",
    "2020-01-01T10:30",
    "2020-01-02T10:30",
    2,
    88.88,
    "lineid 7",
    statusType.CANCEL_TRAVEL
  ),
  createData(
    "8",
    "Camping 8",
    "Chiang Rai",
    "Camping in Chiang Rai",
    "2020-01-09T10:30",
    "2020-01-10T10:30",
    2,
    100.44,
    "lineid 8",
    statusType.TEAVELLING
  ),
  createData(
    "9",
    "Camping 9",
    "Bangkok",
    "Camping in Bangkok",
    "2020-01-11T10:30",
    "2020-01-12T10:30",
    2,
    22.67,
    "lineid 9",
    statusType.WAITING_FOR_REVIEW
  ),
  createData(
    "10",
    "Camping 10",
    "Phuket",
    "Camping in Phuket",
    "2020-01-01T10:30",
    "2020-01-02T10:30",
    2,
    44.98,
    "lineid 10",
    statusType.FINISHED
  ),
  createData(
    "11",
    "Camping 11",
    "Chiang Mai",
    "Camping in Chiang Mai",
    "2020-01-01T10:30",
    "2020-01-02T10:30",
    2,
    50.55,
    "lineid 11",
    statusType.WAITING_FOR_GUIDE
  ),
  createData(
    "12",
    "Camping 12",
    "Bangkok",
    "Camping in Bangkok",
    "2020-01-01T10:30",
    "2020-01-02T10:30",
    2,
    44.22,
    "lineid 12",
    statusType.GUIDE_REJECTED
  ),
  createData(
    "13",
    "Camping 13",
    "Pathumthani",
    "Camping in Pathumthani",
    "2020-01-01T10:30",
    "2020-01-02T10:30",
    2,
    99.12,
    "lineid 13",
    statusType.WAITING_FOR_PAYMENT
  ),
];