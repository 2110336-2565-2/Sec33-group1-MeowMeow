import {
  TableCell,
  IconButton,
  TableRow,
  Collapse,
  styled,
} from "@mui/material";
import React from "react";
import { IPaymentData } from "../data/recordType";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ContentDescription from "./contentDescription";
import PaymentStatus from "./statusShow";

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
  row: IPaymentData;
  index: number;
}

export default function ContentComponent({ row, index }: IContentTable) {
  const [open, setOpen] = React.useState(false);
  const labelId = `record-${index}`;

  return (
    <>
      <StyledTableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
          align="center"
        >
          {row.id}
        </TableCell>
        <TableCell align="center">{row.userID}</TableCell>
        <TableCell align="center">{row.guideID}</TableCell>
        <TableCell align="center">{row.timeStamp}</TableCell>
        <TableCell align="center">{row.price}</TableCell>
        <TableCell align="center">
          <PaymentStatus status={row.paymentStatus} />
        </TableCell>
      </StyledTableRow>
      <StyledTableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ContentDescription title="Note: " description="ccccc" />
            <ContentDescription title="Guide's LineID" description="xxxx" />
          </Collapse>
        </TableCell>
      </StyledTableRow>
    </>
  );
}
