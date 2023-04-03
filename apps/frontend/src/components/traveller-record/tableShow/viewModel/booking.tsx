import apiClient from "@/utils/apiClient";
import React, { useEffect, useState } from "react";
import { GetBookingsByUserIdResponse } from "types";
import { BookingStatus } from "../../../../../../../packages/database/src";

export interface IBookingProps {
  offset: number;
  limit: number;
  setRows: React.Dispatch<React.SetStateAction<IGetRecord[]>>;
  setRowsCount: React.Dispatch<React.SetStateAction<number>>;
}

export interface IResultRecord {
  count: number;
  rows: IGetRecord[];
}

export interface IGetRecord {
  id: number;
  startDate: string;
  endDate: string;
  bookingStatus: string;
  postId: number;
}

export default function bookingViewModel({
  offset,
  limit,
  setRows,
  setRowsCount,
}: IBookingProps) {
  const [travellerRecord, setTravellerRecord] = useState<IGetRecord[]>([]);
  const [countData, setCountData] = useState<number>(0);

  async function getRecordData() {
    let result: IGetRecord[] = [];
    let message = "Loading.. ";
    if (limit === -1) {
      limit = countData;
    }
    await apiClient
      .get<GetBookingsByUserIdResponse>("/bookings/self", {
        params: { offset: offset, limit: limit },
      })
      .then((res) => {
        // console.log("Response Record: ", res);
        result = res.data.bookings;
        setTravellerRecord(result);
        setCountData(res.data.bookingsCount);
        message = "Success";

        setRows(result);
        setRowsCount(res.data.bookingsCount);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });

    return message;
  }

  useEffect(() => {
    const p = new Promise<string>((resolve, reject) => {
      const message = getRecordData();
      resolve(message);
    });
    p.then(() => {
      // console.log("travellerRecord", travellerRecord);
    });
  }, [offset, limit]);

  let ans: IResultRecord = {
    count: countData,
    rows: travellerRecord,
  };

  return ans;
}
