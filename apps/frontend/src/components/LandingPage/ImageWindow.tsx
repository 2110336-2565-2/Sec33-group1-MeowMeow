import { Grid, Paper, styled } from "@mui/material";
import Image from "next/image";

export default function ImageWindow() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      columnSpacing={1}
    >
      <Grid item xs={6}>
        <Image
          src={"/landing/travel2.png"}
          alt="user"
          height={422}
          width={281}
          priority
        />
      </Grid>
      <Grid item xs={6}>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          alignItems="center"
          rowSpacing={3}
        >
          <Grid item>
            <Image
              src={"/landing/travel1.png"}
              alt="user"
              height={252}
              width={267}
              priority
            />
          </Grid>
          <Grid item>
            <Image
              src={"/landing/travel3.png"}
              alt="user"
              height={255}
              width={290}
              priority
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    cols: 2,
  },
];
