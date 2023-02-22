import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
  styled,
  tableCellClasses,
} from "@mui/material";
import { IData, Order } from "./data/recordType";

interface HeadCell {
  id: keyof IData;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    label: "Trip Name",
  },
  {
    id: "location",
    numeric: false,
    label: "Location",
  },
  {
    id: "description",
    numeric: false,
    label: "Description",
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
    id: "participant",
    numeric: true,
    label: "Participant",
  },
  {
    id: "price",
    numeric: true,
    label: "Price",
  },
  {
    id: "lineid",
    numeric: false,
    label: "Line ID",
  },
  {
    id: "status",
    numeric: false,
    label: "Status",
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fc9c8b",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IData
  ) => void;
  order: Order;
  orderBy: string;
}

export default function TableHeader(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof IData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
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
