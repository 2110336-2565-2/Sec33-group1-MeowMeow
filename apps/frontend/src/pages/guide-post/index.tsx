<<<<<<< HEAD
import { Button, ButtonGroup } from "@mui/material";
import { Router, useRouter } from "next/router";
import React from "react";

// For testing purposes, I have created a button group that will allow you to navigate to the create and edit pages.
export default function GuidePost() {
  const router = useRouter();
  const onChangeCreate = () => {
    router.push("guide-post/create");
  };
  const onChangeEdit = () => {
    router.push("guide-post/edit/1");
  };
  const onChangeDelete = () => {
    console.log("delete");
  };

  const buttons = [
    <Button key="one" onClick={onChangeCreate}>
      Create
    </Button>,
    <Button key="two" onClick={onChangeEdit}>
      Edit
    </Button>,
    <Button key="three" onClick={onChangeDelete}>
      Delete
    </Button>,
  ];
  return (
    <>
      <ButtonGroup size="large" aria-label="large button group">
        {buttons}
      </ButtonGroup>
    </>
  );
}
=======
import CreateingPost from "@/components/guide-post/creatingPost";
import React from "react";

function GuidePost() {
  return (
    <>
      <CreateingPost />
    </>
  );
}

export default GuidePost;
>>>>>>> 9f25609 (fix: init form-post)
