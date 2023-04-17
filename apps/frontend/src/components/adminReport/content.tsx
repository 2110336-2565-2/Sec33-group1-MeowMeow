import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Grid, TablePagination, Typography } from "@mui/material";
import apiClient from "@/utils/apiClient";
import dayjs from "dayjs";
import theme from "@/config/theme";
import TablePaginationActions from "./tablePaginationActions";
import Top from "./top";
import DashBoard from "@/components/Dashboard/DashBoard";

interface IReport {
  id: number;
  createdAt: string;
  reportType: string;
  text: string;
  reporterId: number;
  guideId: number;
  postId: number;
}
const getReports = async (offset: number, limit: number) => {
  const response = await apiClient.get(
    "reports?offset=" + offset + "&limit=" + limit
  );
  return response.data;
};
const style = {
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
};
const Content = () => {
  const [reports, setReports] = useState<IReport[]>([]);
  const [reportsCount, setReportsCount] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  useEffect(() => {
    const fetchInfo = async () => {
      const data = await getReports(page * rowsPerPage, rowsPerPage);
      setReports(data.reports);
      setReportsCount(data.reportsCount);
    };
    fetchInfo();
  }, [page, rowsPerPage]);
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
  return (
    <DashBoard roleAllowed={["ADMIN"]}>
      <Box
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          background:
            "linear-gradient(90deg, #fff3d4 0%, #FAD0C4 99%, #FAD0C4 100%)",
          padding: "40px 20px",
        }}
      >
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
            <Typography
              variant="h5"
              component="span"
              paddingBottom={1}
              sx={{ fontWeight: "bold" }}
            >
              All Reports
            </Typography>
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={reportsCount}
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
                <TableRow>
                  <TableCell align="center" width="5%" style={style}>
                    Report ID
                  </TableCell>
                  <TableCell align="center" width="15%" style={style}>
                    Timestamp
                  </TableCell>
                  <TableCell align="center" width="5%" style={style}>
                    Reporter
                  </TableCell>
                  <TableCell align="center" width="10%" style={style}>
                    Report type
                  </TableCell>
                  <TableCell align="center" width="12%" style={style}>
                    Related guide/post ID
                  </TableCell>
                  <TableCell align="center" width="30%" style={style}>
                    Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => (
                  <TableRow
                    key={report.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {report.id}
                    </TableCell>
                    <TableCell align="center">
                      {dayjs(report.createdAt).format("DD-MM-YYYY hh:mm A")}
                    </TableCell>
                    <TableCell align="center">{report.reporterId}</TableCell>
                    <TableCell align="center">{report.reportType}</TableCell>
                    <TableCell align="center">
                      {report.reportType == "GUIDE"
                        ? report.guideId
                        : report.reportType == "TRIP"
                        ? report.postId
                        : "-"}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {report.text}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Top />
      </Box>
    </DashBoard>
  );
};
export default Content;
