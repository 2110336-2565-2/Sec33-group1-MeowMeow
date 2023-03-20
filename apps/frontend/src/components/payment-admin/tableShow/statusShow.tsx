import theme from "@/config/theme";
import { Box, Paper, styled } from "@mui/material";
import React from "react";
import { statusPaymentType } from "../data/statusHandle";

interface IStatusShow {
  status: string;
}

const Item = styled(Paper)(({ theme, color }) => ({
  backgroundColor: color,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.grey[100],
}));

export default function PaymentStatus({ status }: IStatusShow) {
  if (status === statusPaymentType.TRAVELLER_PAID) {
    return <Item color={theme.palette.success.main}>Traveller Paid</Item>;
  } else if (status === statusPaymentType.WAITING_REFUND) {
    return <Item color={theme.palette.warning.main}>Waiting Refund</Item>;
  } else if (status === statusPaymentType.REFUNDED) {
    return <Item color={theme.palette.info.main}>Refunded</Item>;
  } else if (status === statusPaymentType.HOLDING) {
    return <Item color={theme.palette.secondary.main}>Holding</Item>;
  }
  return <Item color={theme.palette.primary.main}>Guide get paid</Item>;
}
