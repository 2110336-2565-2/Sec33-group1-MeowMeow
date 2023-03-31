import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  styled,
  tableCellClasses,
} from "@mui/material";
import { Order } from "../data/recordType";
import { IGetRecord } from "./viewModel/booking";

// Not use now

interface HeadCell {
  id: keyof IGetRecord;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: true,
    label: "Booking ID",
  },
  {
    id: "startDate",
    numeric: false,
    label: "Start Date",
  },
  {
    id: "endDate",
    numeric: false,
    label: "End Date",
  },
  {
    id: "postId",
    numeric: true,
    label: "Status",
  },
  {
    id: "bookingStatus",
    numeric: false,
    label: "Status",
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell align="center"></StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell key={headCell.id} align="center"></StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
