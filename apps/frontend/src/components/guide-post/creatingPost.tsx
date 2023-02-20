import { Typography } from "@mui/material";
import React from "react";
import PostForm from "./creatingPostForm";
import PostContainer from "./postContainer";

export default function CreateingPost() {
  return (
    <>
      <PostContainer>
        <Typography variant="h5" fontWeight="600" marginBottom={"40px"}>
          Create Post
        </Typography>
        <PostForm />
      </PostContainer>
    </>
  );
}
