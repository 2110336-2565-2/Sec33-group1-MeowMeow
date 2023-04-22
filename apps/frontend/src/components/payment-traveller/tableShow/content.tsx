import { TableCell, TableRow, styled } from "@mui/material";
import React from "react";
import PaymentStatus from "./statusShow";
import { IGetRecord } from "./viewModel";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface IContentTable {
  row: IGetRecord;
  index: number;
}

export default function ContentComponent({ row, index }: IContentTable) {
  const labelId = `record-${index}`;
  const date = new Date(row.updatedAt);
  const dateString = date
    .toLocaleString("en-US", { timeZone: "Asia/Bangkok", hour12: true })
    .replace(",", "");

  return (
    <>
      <StyledTableRow>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
          align="center"
        >
          {row.transactionId}
        </TableCell>
        <TableCell align="center">{row.bookingId}</TableCell>
        <TableCell align="center">{row.postId}</TableCell>
        <TableCell align="center">{dateString}</TableCell>
        <TableCell align="center">
          <PaymentStatus status={row.transactionType} />
        </TableCell>
      </StyledTableRow>
    </>
  );
}
