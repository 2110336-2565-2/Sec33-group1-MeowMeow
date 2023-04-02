import apiClient from "@/utils/apiClient";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TransactionType } from "../../../../../../packages/database/src";

export interface IGetRecord {
  transactionId: number;
  transactionType: TransactionType;
  userId: number;
  username: string;
  bookingId: number;
  postId: number;
}

export default function viewModel() {
  const router = useRouter();
  const [record, setRecord] = useState<IGetRecord[]>([]);

  async function getPostData() {
    let result: IGetRecord[] = [];
    let message = "";
    await apiClient
      .get<IGetRecord[]>("/payments")
      .then((res) => {
        // console.log("Response: ", res);
        result = res.data;
        setRecord(result);
        message = "Success";
      })
      .catch((err) => {
        message = "Error";
        console.log("Error: ", err);
      });
    return message;
  }

  useEffect(() => {
    const p = new Promise<string>((resolve, reject) => {
      const message = getPostData();
      // console.log("Message: ", message);
      resolve(message);
    });
    p.then(() => {
      // console.log("Final Record: ", record);
    });
  }, []);

  return record;
}
