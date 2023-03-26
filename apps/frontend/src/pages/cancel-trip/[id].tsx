import CancelTripComponent from "@/components/traveller-record/cancel-trip";
import AuthProvider, { AuthContext } from "@/context/AuthContext";
import React from "react";

export default function CancelTrip() {
  return (
    <AuthProvider roleAllowed={["USER"]}>
      <CancelTripComponent />
    </AuthProvider>
  );
}
