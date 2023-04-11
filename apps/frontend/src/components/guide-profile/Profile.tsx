import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import { Report } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

interface IProfileProps {
  name: string;
  imageurl: string;
  certificateId: string;
}
export default function Profile({
  name,
  imageurl,
  certificateId,
}: IProfileProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const guideId = router.query.id as string;
  return (
    <Grid
      container
      rowSpacing={4}
      direction={{ xs: "column", md: "row" }}
      justifyContent={{ xs: "center", md: "left" }}
    >
      <Grid
        item
        paddingX={{ xs: "5vw", md: "2vw", lg: "4vw" }}
        display="flex"
        justifyContent="center"
      >
        <Avatar
          src={process.env.backendBaseURL + "/media/" + imageurl}
          sx={{
            width: { xs: 160, sm: 200, md: 160, lg: 200 },
            height: { xs: 160, sm: 200, md: 160, lg: 200 },
          }}
        />
      </Grid>
      <Grid item xs>
        <Grid
          container
          direction="column"
          fontFamily="Inter"
          fontStyle="normal"
          paddingX={{ xs: 0, sm: "3vw", md: 0 }}
        >
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Box fontWeight={600} fontSize={{ xs: 24, sm: 32 }}>
                {name}
              </Box>
            </Grid>
            <Grid item paddingLeft="12px">
              <Chip
                label="Guide"
                size="small"
                sx={{ fontFamily: "Inter", fontSize: { xs: 12, sm: 14 } }}
              />
            </Grid>
            <Grid item paddingLeft="12px">
              <Link
                target="_blank"
                rel="noreferer"
                href={{
                  pathname: "/report",
                  query: { guideId },
                }}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <IconButton color="error" sx={{ padding: "4px" }}>
                  <Report color="error" />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
          <Box
            fontWeight={400}
            fontSize={{ xs: 14, sm: 16, lg: 18 }}
            paddingTop={{ xs: "1vh", sm: "2vh" }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpen(true)}
            >
              View Certificate{" "}
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
              <Avatar
                sx={{ width: 600, height: 420 }}
                variant="square"
                src={process.env.backendBaseURL + "/media/" + certificateId}
              ></Avatar>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
