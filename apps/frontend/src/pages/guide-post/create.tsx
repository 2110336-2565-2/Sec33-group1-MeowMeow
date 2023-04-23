import DashBoard from "@/components/Dashboard/DashBoard";
import CreateingPost from "@/components/guide-post/creatingPost";
import { Roles } from "@/context/type/authContext";
import React from "react";

function GuidePostCreate() {
  return (
    <DashBoard roleAllowed={["GUIDE"]}>
      <CreateingPost />
    </DashBoard>
  );
}

export default GuidePostCreate;
