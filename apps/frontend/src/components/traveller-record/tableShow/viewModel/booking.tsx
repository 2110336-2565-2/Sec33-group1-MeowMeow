import apiClient from "@/utils/apiClient";
import React, { useEffect, useState } from "react";
import { BookingStatus } from "../../../../../../../packages/database/src";

export interface IBookingProps {
  offset: number;
  limit: number;
  setRows: React.Dispatch<React.SetStateAction<IGetRecord[]>>;
}

export interface IGetRecord {
  id: number;
  startDate: string;
  endDate: string;
  bookingStatus: BookingStatus;
  postId: number;
}

export default function bookingViewModel({
  offset,
  limit,
  setRows,
}: IBookingProps) {
  const [travellerRecord, setTravellerRecord] = useState<IGetRecord[]>([]);

  async function getRecordData() {
    let result: IGetRecord[] = [];
    let message = "Loading.. ";
    await apiClient
      .get<IGetRecord[]>("/bookings/self", {
        params: { offset: offset, limit: limit },
      })
      .then((res) => {
        // console.log("Response Record: ", res);
        result = res.data;
        setTravellerRecord(result);
        message = "Success";

        setRows(result);
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

  return travellerRecord;
}
