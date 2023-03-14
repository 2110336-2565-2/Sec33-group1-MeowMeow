import {
  TableCell,
  IconButton,
  TableRow,
  Collapse,
  styled,
} from "@mui/material";
import React from "react";
import { IData } from "../data/recordType";
import StatusDialog from "../dialogStatus";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ContentDescription from "./contentDescription";

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface IContentTable {
  row: IData;
  index: number;
}

export default function ContentComponent({ row, index }: IContentTable) {
  const [open, setOpen] = React.useState(false);
  const labelId = `record-${index}`;

  return (
    <>
      <StyledTableRow hover>
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
          {row.name}
        </TableCell>
        <TableCell align="center">{row.location}</TableCell>
        <TableCell align="center">
          {row.startDate.split("T", 2)[0] +
            " " +
            row.startDate.split("T", 2)[1]}
        </TableCell>
        <TableCell align="center">
          {row.endDate.split("T", 2)[0] + " " + row.endDate.split("T", 2)[1]}
        </TableCell>
        <TableCell align="center">{row.participant}</TableCell>
        <TableCell align="center">{row.price}</TableCell>
        <TableCell align="center">
          <StatusDialog nameButton={row.status} />
        </TableCell>
      </StyledTableRow>
      <StyledTableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ContentDescription
              title="Trip's Description"
              description={row.description}
            />
            <ContentDescription
              title="Guide's LineID"
              description={row.lineid}
            />
          </Collapse>
        </TableCell>
      </StyledTableRow>
    </>
  );
}
