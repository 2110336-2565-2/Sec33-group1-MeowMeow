import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {
  Grid,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import bookingViewModel, { IGetRecord } from "./viewModel/booking";
import { useEffect } from "react";
import StatusDialog from "../dialogStatus";
import PostDialog from "./dialogPost";

export default function TableRecord() {
  const record = bookingViewModel();
  const prev = React.useRef(record);
  const [rows, setRows] = React.useState<IGetRecord[]>([]);

  useEffect(() => {
    setRows(record);
  }, [prev.current !== record]);

  // console.log("==> ", record);

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
                <TableCell align="center"> Record ID </TableCell>
                <TableCell align="center">Start Date</TableCell>
                <TableCell align="center">End Date)</TableCell>
                <TableCell align="center">Post</TableCell>
                <TableCell align="center">Record Type</TableCell>
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
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
