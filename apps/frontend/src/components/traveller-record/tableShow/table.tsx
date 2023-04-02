import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { ITravellerData, Order } from "../data/recordType";
import { rows } from "../data/mockData";
import TableHeader from "./headTable";
import { stableSort, getComparator } from "../data/sorting";
import { Grid, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import ContentComponent from "./content";
import viewModel, { IGetRecord } from "./viewModel";

export default function TableRecord() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof ITravellerData>("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const record: IGetRecord = viewModel()
  // const prev = React.useRef(record);
  // const [rows, setRows] = React.useState<IGetRecord>(record);    // use rows instrad of rows from mock data
  // useEffect(() => {
  //   setRows({ ...record });
  // }, [prev.current !== record]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ITravellerData
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

        <TableContainer sx={{ padding: "20px" }}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody sx={{ backgroundColor: "#faf7f5" }}>
              {stableSort(rows, getComparator(order, orderBy)) // rows is mock data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <ContentComponent
                      key={row.name + index}
                      row={row}
                      index={index}
                    />
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
      </Paper>
    </>
  );
}
