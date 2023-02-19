import { Typography } from "@mui/material";
import React from "react";
<<<<<<< HEAD
import PostContainer from "./postContainer";
import PostForm from "./postForm";
=======
import GuidePostForm from "./form";
import PostContainer from "./postContainer";
>>>>>>> 9f25609 (fix: init form-post)

export default function CreateingPost() {
  return (
    <>
      <PostContainer>
        <Typography variant="h5" fontWeight="600" marginBottom={"40px"}>
<<<<<<< HEAD
          Create Post
        </Typography>
        <PostForm methodType="POST" />
=======
          {" "}
          Create Post{" "}
        </Typography>
        <GuidePostForm />
>>>>>>> 9f25609 (fix: init form-post)
      </PostContainer>
    </>
  );
}
