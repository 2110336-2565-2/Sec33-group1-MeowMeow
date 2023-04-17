import DashBoard from "@/components/Dashboard/DashBoard";
import PaymentAdminComponent from "@/components/payment-admin";
import React from "react";

export default function PaymentAdmin() {
  return (
    <DashBoard roleAllowed={["ADMIN"]}>
      <PaymentAdminComponent />
    </DashBoard>
  );
}
