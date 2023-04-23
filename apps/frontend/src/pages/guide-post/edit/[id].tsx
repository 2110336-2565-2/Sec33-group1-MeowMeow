import DashBoard from "@/components/Dashboard/DashBoard";
import EditingPost from "@/components/guide-post/editingPost";
import React, { useContext } from "react";

export default function GuidePostEdit() {
  return (
    <DashBoard roleAllowed={["GUIDE"]}>
      <EditingPost />
    </DashBoard>
  );
}
