import apiClient from "@/utils/apiClient";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export interface IGetRecord {
  postID?: number;
  message?: string;
  authorId?: string;
  title: string;
  content: string;
  locations: string[];
  tags: string[];
  fee: number;
  maxParticipant: number;
  contactInfo: string;
}

export default function viewModel() {
  const router = useRouter();
  const [record, setRecord] = useState<IGetRecord>({} as IGetRecord);

  const postID = router.query.id?.toString();
  async function getPostData() {
    let result: IGetRecord = {} as IGetRecord;
    result.message = "Loading.. ";
    await apiClient
      .get<IGetRecord>("/myAPI/")
      .then((res) => {
        result = res.data;
        setRecord({
          title: result.title,
          locations: result.locations,
          tags: result.tags,
          content: result.content,
          fee: result.fee,
          maxParticipant: result.maxParticipant,
          contactInfo: result.contactInfo,
        } as IGetRecord);
        result.message = "Success";
      })
      .catch((err) => {
        console.log("Error: ", err);
      });

    return result.message;
  }

  useEffect(() => {
    if (postID !== undefined) {
      const p = new Promise<string>((resolve, reject) => {
        const message = getPostData();
        resolve(message);
      });
      p.then(() => {
        // console.log("Final FormBody: ", formBody);
      });
    } else {
    }
  }, [postID]);

  return record;
}
