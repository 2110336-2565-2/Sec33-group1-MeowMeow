import { Typography } from "@mui/material";
import React from "react";
import FormPost from "./formPost";
import PostContainer from "./postContainer";
import PostForm from "./formEdit";

export default function CreateingPost() {
  return (
    <>
      <PostContainer>
        <Typography variant="h5" fontWeight="600" marginBottom={"40px"}>
          Create Post
        </Typography>
        {/* <PostForm methodType="POST" /> */}
        <FormPost />
      </PostContainer>
    </>
  );
}
