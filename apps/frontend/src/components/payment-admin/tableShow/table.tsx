import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { Order } from "../data/sorting";
import TableHeader from "./headTable";
import { stableSort, getComparator } from "../data/sorting";
import { Grid, Typography } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ContentComponent from "./content";
import theme from "@/config/theme";
import viewModel, { IGetRecord } from "./viewModel";
import { useEffect } from "react";

export default function TableRecord() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof IGetRecord>("transactionId");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const record = viewModel();
  const prev = React.useRef(record);
  const [rows, setRows] = React.useState<IGetRecord[]>([]);

  useEffect(() => {
    setRows(record);
  }, [prev.current !== record]);

  console.log("==> ", record);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IGetRecord
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Paper
        sx={{ width: "100%", mb: 2, padding: "20px", alignItems: "center" }}
        elevation={3}
      >
        {rows.length === 0 ? (
          <Typography variant="h5" component="span" sx={{ fontWeight: "bold" }}>
            No Record
          </Typography>
        ) : (
          <>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              sx={{
                backgroundColor: theme.palette.primary.main,
                padding: "20px",
              }}
            >
              <MonetizationOnIcon />
              <Typography
                variant="h5"
                component="span"
                sx={{ fontWeight: "bold" }}
              >
                Transaction Record
              </Typography>
            </Grid>

            <TableContainer sx={{}}>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <TableHeader
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody sx={{ backgroundColor: "#faf7f5" }}>
                  {stableSort<IGetRecord>(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <ContentComponent key={index} row={row} index={index} />
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </>
  );
}
