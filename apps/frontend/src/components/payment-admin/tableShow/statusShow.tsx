import theme from "@/config/theme";
import { Box, Paper, styled } from "@mui/material";
import React from "react";
import { statusType } from "../data/statusHandle";

interface IStatusShow {
  status: string;
}

const Item = styled(Paper)(({ theme, color }) => ({
  backgroundColor: color,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function PaymentStatus({ status }: IStatusShow) {
  if (status === statusType.TRAVELLER_PAID) {
    return <Item color={theme.palette.success.main}>Traveller Paid</Item>;
  } else if (status === statusType.WAITING_REFUND) {
    return <Item color={theme.palette.warning.main}>Waiting Refund</Item>;
  } else if (status === statusType.REFUNDED) {
    return <Item color={theme.palette.info.main}>Refunded</Item>;
  } else if (status === statusType.HOLDING) {
    return <Item color={theme.palette.secondary.main}>Holding</Item>;
  }
  return <Item color={theme.palette.primary.main}>Guide get paid</Item>;
}
