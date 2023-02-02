import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Grid, Paper, styled } from "@mui/material";
import Image from "next/image";
import theme from "@/config/theme";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function QuiltedImageList() {
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

    // <ImageList
    //   sx={{ width: 500, height: 450 }}
    //   variant="quilted"
    //   cols={4}
    //   rowHeight={121}
    // >
    //   {itemData.map((item) => (
    //     <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
    //       <img
    //         {...srcset(item.img, 121, item.rows, item.cols)}
    //         alt={item.title}
    //         loading="lazy"
    //       />
    //     </ImageListItem>
    //   ))}
    // </ImageList>
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
