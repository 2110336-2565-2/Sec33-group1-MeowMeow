import apiClient from "@/utils/apiClient";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export interface IPost {
  authorId: string;
  title: string;
  content: string;
  locations: string[];
  tags: string[];
  fee: number;
  maxParticipant: number;
  contactInfo: string;
}

export default function postViewModel(postID: number) {
  const [post, setPost] = useState<IPost>({} as IPost);

  async function getRecordData() {
    let result: IPost = {} as IPost;
    let message = "Loading.. ";
    await apiClient
      .get<IPost>("/posts/" + postID)
      .then((res) => {
        // console.log("Response Record: ", res);
        result = res.data;
        setPost(result);
        message = "Success";
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
      // console.log("Post THEN: ", post);
    });
  }, []);

  return post;
}
