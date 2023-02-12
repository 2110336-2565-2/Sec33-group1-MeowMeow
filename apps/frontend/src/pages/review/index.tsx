import Detail from "@/components/review/detail";
import Star from "@/components/review/star";
import theme from "@/config/theme";
import { Alert, Button, DialogActions, Grid } from "@mui/material";
import React from "react";

interface reviewProps {
  handleDialog: () => void;
}

export default function Review(props: reviewProps) {
  const [star, setStar] = React.useState<number | null>(null);
  const [detail, setDetail] = React.useState<string>("");
  const [isAlert, setIsAlert] = React.useState<boolean>(false);

  const handleStar = (starValue: number | null) => {
    setStar(starValue);
  };
  const handleDetail = (detailValue: string) => {
    setDetail(detailValue);
  };

  const handleSubmit = () => {
    if (star === null || star === 0 || detail === "") {
      setIsAlert(true);
      return;
    }
    setIsAlert(false);
    console.log("star: ", star, "\ndetail: ", detail);
  };

  return (
    <Grid
      container
      sx={{
        backgroundColor: "#ffffff",
        padding: { sm: 5, xs: 2 },
        paddingTop: 2,
        borderRadius: 5,
      }}
      width={"auto"}
      height={"auto"}
      justifyContent="center"
      alignItems="center"
    >
      {isAlert && (
        <Alert severity="error">
          Error! Please Provide star rating and comment before submit
        </Alert>
      )}
      <Grid item xs={8} sm={12}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          fontWeight={600}
          fontSize={30}
          sx={{ marginBottom: 2 }}
        >
          Review
        </Grid>
        <Grid container justifyContent="flex-start" alignItems="center">
          <Grid item xs={12}>
            Natee Niparnan
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <Star handleStar={handleStar} star={star} />
          </Grid>
          <Grid item xs={12}>
            <Detail detail={detail} handleDetail={handleDetail} />
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
            <Grid item>
              <DialogActions>
                <Button
                  variant="contained"
                  sx={{ color: theme.palette.grey[100] }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
