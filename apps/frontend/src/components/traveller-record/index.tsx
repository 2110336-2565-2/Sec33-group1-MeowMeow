import React from "react";
import FooterBar from "../common/FooterBar";
import ContainerTableRecord from "./containerRecord";
import TableRecord from "./table";

export default function TravellerRecordComponent() {
  return (
    <ContainerTableRecord>
      <TableRecord />
      <FooterBar />
    </ContainerTableRecord>
  );
}
