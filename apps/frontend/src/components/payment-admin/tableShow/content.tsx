import { TableCell, TableRow, styled } from "@mui/material";
import React from "react";
import PaymentStatus from "./statusShow";
import { IGetRecord } from "./viewModel";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(4n+1)": {
    backgroundColor: theme.palette.grey[200],
  },
  "&:nth-of-type(4n+2)": {
    backgroundColor: theme.palette.grey[200],
  },
  "&:nth-of-type(4n-1)": {
    backgroundColor: "#ffffff",
  },
  "&:nth-of-type(4n)": {
    backgroundColor: "#ffffff",
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

  console.log("------> ", row);
  console.log("------> ", row.bookingId);

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
        <TableCell align="center">{row.userId}</TableCell>
        <TableCell align="center">{row.username}</TableCell>
        <TableCell align="center">{row.bookingId}</TableCell>
        <TableCell align="center">{row.postId}</TableCell>
        <TableCell align="center">
          <PaymentStatus status={row.transactionType} />
        </TableCell>
      </StyledTableRow>
    </>
  );
}
