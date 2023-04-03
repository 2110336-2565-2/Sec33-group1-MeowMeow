import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {
  Grid,
  styled,
  TableCell,
  tableCellClasses,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import bookingViewModel, { IGetRecord } from "./viewModel/booking";
import { useEffect, useState } from "react";
import StatusDialog from "./dialogStatus";
import PostDialog from "./dialogPost";
import TablePaginationActions from "./pagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function TableRecord() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(1);

  const [rows, setRows] = React.useState<IGetRecord[]>([]);

  let record = bookingViewModel({ offset: page, limit: rowsPerPage, setRows });
  let prev = React.useRef(record);

  useEffect(() => {
    setRows(record.rows);
  }, [prev.current !== record]);

  let emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (rows.length === 0) {
    return (
      <Typography variant="h5" component="span" sx={{ fontWeight: "bold" }}>
        No Record
      </Typography>
    );
  }

  return (
    <>
      <Paper
        sx={{ width: "100%", mb: 2, padding: "20px", alignItems: "center" }}
        elevation={3}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <DescriptionIcon />
          <Typography variant="h5" component="span" sx={{ fontWeight: "bold" }}>
            Traveller's Records
          </Typography>
        </Grid>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center"> Record ID </StyledTableCell>
                <StyledTableCell align="center">Start Date</StyledTableCell>
                <StyledTableCell align="center">End Date)</StyledTableCell>
                <StyledTableCell align="center">Post</StyledTableCell>
                <StyledTableCell align="center">Record Type</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(row.startDate).toDateString() +
                      " " +
                      new Date(row.startDate).toLocaleTimeString()}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(row.endDate).toDateString() +
                      " " +
                      new Date(row.endDate).toLocaleTimeString()}
                  </TableCell>
                  <TableCell align="center">
                    <PostDialog postId={row.postId} />
                  </TableCell>
                  <TableCell align="center" sx={{ maxWidth: "200px" }}>
                    <StatusDialog
                      nameButton={row.bookingStatus}
                      tripId={row.id}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[1, 2, 3, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={2} // total row in database (Mock)
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
