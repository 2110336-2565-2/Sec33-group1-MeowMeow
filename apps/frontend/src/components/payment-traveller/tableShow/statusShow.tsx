import theme from "@/config/theme";
import { Box, Paper, styled } from "@mui/material";
import React from "react";
import { TransactionType } from "../../../../../../packages/database/src";

interface IStatusShow {
  status: string;
}

const Item = styled(Paper)(({ theme, color }) => ({
  backgroundColor: color,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));

export default function PaymentStatus({ status }: IStatusShow) {
  if (status === TransactionType.CHARGES) {
    return <Item color={theme.palette.success.main}>Traveller Paid Money</Item>;
  } else if (status === TransactionType.TRANSFERS) {
    return <Item color={theme.palette.warning.main}>Guide Get Money</Item>;
  } else if (status === TransactionType.REFUNDS) {
    return (
      <Item color={theme.palette.info.main}>Refund money to traveller</Item>
    );
  }
  return <Item color={theme.palette.primary.light}>Guide get paid</Item>;
}
