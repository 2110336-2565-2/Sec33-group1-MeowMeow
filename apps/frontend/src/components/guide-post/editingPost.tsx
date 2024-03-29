import { Typography } from "@mui/material";
import React from "react";
import PostForm from "./formEdit";
import PostContainer from "./postContainer";

export default function EditingPost() {
  return (
    <>
      <PostContainer>
        <Typography variant="h5" fontWeight="600" marginBottom={"40px"}>
          Edit Post
        </Typography>
        <PostForm />
      </PostContainer>
    </>
  );
}
