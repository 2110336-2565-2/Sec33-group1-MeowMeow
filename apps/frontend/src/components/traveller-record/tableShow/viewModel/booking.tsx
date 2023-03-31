import apiClient from "@/utils/apiClient";
import React, { useEffect, useState } from "react";
import { BookingStatus } from "../../../../../../../packages/database/src";

export interface IGetRecord {
  id: number;
  startDate: string;
  endDate: string;
  bookingStatus: BookingStatus;
  postId: number;
}

export default function bookingViewModel() {
  const [travellerRecord, setTravellerRecord] = useState<IGetRecord[]>([]);
  let postIDs: number[] = [];

  async function getRecordData() {
    let result: IGetRecord[] = [];
    let message = "Loading.. ";
    await apiClient
      .get<IGetRecord[]>("/bookings/self")
      .then((res) => {
        // console.log("Response Record: ", res);
        result = res.data;
        setTravellerRecord(result);
        message = "Success";
        postIDs = result.map((item) => item.postId);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });

    return message;
  }

  // async function getPostData(postID: number) {
  //   let result: IPost = {} as IPost;
  //   let message = "Loading.. ";
  //   await apiClient
  //     .get<IPost>("/posts/"+postID)
  //     .then((res) => {
  //       console.log("Response Post: ", res);
  //       result = res.data;
  //       setPost(result);
  //       message = "Success";
  //     })
  //     .catch((err) => {
  //       console.log("Error: ", err);
  //     });

  //   return message;
  // }

  useEffect(() => {
    const p = new Promise<string>((resolve, reject) => {
      const message = getRecordData();
      resolve(message);
    });
    p.then(() => {
      // console.log("Post THEN: ", post);
    });
  }, []);

  return travellerRecord;
}
