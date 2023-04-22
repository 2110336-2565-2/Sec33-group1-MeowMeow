import DashBoard from "@/components/Dashboard/DashBoard";
import PaymentTravellerComponent from "@/components/payment-traveller";
import React from "react";

export default function PaymentTraveller() {
  return (
    <DashBoard roleAllowed={["USER"]}>
      <PaymentTravellerComponent />
    </DashBoard>
  );
}
