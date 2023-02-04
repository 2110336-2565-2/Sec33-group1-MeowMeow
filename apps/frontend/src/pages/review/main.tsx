import Category from "@/components/review/category";
import Detail from "@/components/review/detail";
import Star from "@/components/review/star";
import DisplayUsername from "@/components/review/displayUsername";
import theme from "@/config/theme";
import { Button, Grid } from "@mui/material";
import React from "react";

export default function Review() {
  const [star, setStar] = React.useState<number | null>(0);
  const [category, setCategory] = React.useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [detail, setDetail] = React.useState<string>("");
  const [isShowUsername, setIsShowUsername] = React.useState<boolean>(false);

  const handleStar = (starValue: number | null) => {
    setStar(starValue);
  };
  const handleCategory = (categoryValue: string | null, index: number) => {
    category[index] = categoryValue;
    setCategory(category);
  };
  const handleDetail = (detailValue: string) => {
    setDetail(detailValue);
  };
  const handleIsShowUsername = (isShowUsernameValue: boolean) => {
    setIsShowUsername(isShowUsernameValue);
  };
  const handleSubmit = () => {
    console.log(
      "star: ",
      star,
      "\ncategory: ",
      category,
      "\ndetail: ",
      detail,
      "\nisShowUsername: ",
      isShowUsername
    );
  };

  return (
    <Grid
      container
      sx={{
        backgroundColor: theme.palette.grey["100"],
        margin: 5,
        padding: 5,
        borderRadius: 5,
      }}
      width={583}
      height={"auto"}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
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
        <Grid container>
          <Grid item xs={12}>
            Natee Niparnan
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <Star handleStar={handleStar} star={star} />
          </Grid>
          <Grid item xs={12}>
            <Category point={star} handleCategory={handleCategory} />
          </Grid>
          <Grid item xs={12}>
            <Detail detail={detail} handleDetail={handleDetail} />
          </Grid>
          <Grid item xs={12}>
            <DisplayUsername
              isShowUsername={isShowUsername}
              handleIsShowUsername={handleIsShowUsername}
            />
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
            <Grid item>
              <Button
                variant="contained"
                sx={{ color: theme.palette.grey[100] }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
