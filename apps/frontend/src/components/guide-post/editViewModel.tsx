import apiClient from "@/utils/apiClient";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export interface IGetPost {
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

export default function editViewModel() {
  const router = useRouter();
  const [formBody, setFormBody] = useState<IGetPost>({} as IGetPost);
  // let authorId: string | undefined = "";
  // const { user } = useContext(AuthContext);

  const postID = router.query.id?.toString();
  async function getPostData() {
    let result: IGetPost = {} as IGetPost;
    result.message = "Loading.. ";
    await apiClient
      .get<IGetPost>("/posts/" + postID)
      .then((res) => {
        result = res.data;
        setFormBody({
          title: result.title,
          locations: result.locations,
          tags: result.tags,
          content: result.content,
          fee: result.fee,
          maxParticipant: result.maxParticipant,
          contactInfo: result.contactInfo,
          authorId: result.authorId,
        } as IGetPost);
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

  return formBody;
}
