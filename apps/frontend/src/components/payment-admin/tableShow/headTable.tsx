import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  styled,
  tableCellClasses,
} from "@mui/material";
import { IPaymentData, Order } from "../data/recordType";

interface HeadCell {
  id: keyof IPaymentData;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: false,
    label: "ID",
  },
  {
    id: "userID",
    numeric: false,
    label: "User ID",
  },
  {
    id: "guideID",
    numeric: false,
    label: "Guide ID",
  },
  {
    id: "timeStamp",
    numeric: false,
    label: "TimeStamp",
  },
  {
    id: "price",
    numeric: true,
    label: "Price",
  },
  {
    id: "paymentStatus",
    numeric: true,
    label: "Payment Status",
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
    property: keyof IPaymentData
  ) => void;
  order: Order;
  orderBy: string;
}

export default function TableHeader(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof IPaymentData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell align="center"></StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
