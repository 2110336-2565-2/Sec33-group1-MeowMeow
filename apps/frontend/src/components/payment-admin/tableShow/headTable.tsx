import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  styled,
  tableCellClasses,
} from "@mui/material";
import { Order } from "../data/sorting";
import { IGetRecord } from "./viewModel";

interface HeadCell {
  id: keyof IGetRecord;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "transactionId",
    label: "Transaction ID",
    numeric: false,
  },
  {
    id: "userId",
    label: "User ID",
    numeric: true,
  },
  {
    id: "username",
    label: "Username",
    numeric: false,
  },
  {
    id: "bookingId",
    label: "Booking ID",
    numeric: true,
  },
  {
    id: "postId",
    label: "Post ID",
    numeric: true,
  },
  {
    id: "transactionType",
    label: "Transaction Type",
    numeric: false,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IGetRecord
  ) => void;
  order: Order;
  orderBy: string;
}

export default function TableHeader(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof IGetRecord) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell align="center"> No. </StyledTableCell>
        <StyledTableCell align="center"> User ID </StyledTableCell>
        <StyledTableCell align="center"> Username </StyledTableCell>
        <StyledTableCell align="center"> Booking ID </StyledTableCell>
        <StyledTableCell align="center"> Post ID </StyledTableCell>
        <StyledTableCell align="center"> Transaction Type </StyledTableCell>
      </TableRow>
    </TableHead>
  );
}
