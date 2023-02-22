import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
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
          <TableCell
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
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
