import { Grid } from "@mui/material";
import Image from "next/image";
import { IPost } from "../types";
import CardContent from "./CardContent";
import CardHeader from "./CardHeader";

export const mockPost: IPost = {
  id: 1,
  title: "Trip 3 days 2 nights to Bali",
  author: {
    name: "John Doe",
    profile: "/images/searchPage/profile.jpeg", // webp is better
  },
  body: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. ",
  price: 10000,
  image: "/landing/travel1.png",
  location: "Bali, Indonesia",
  amount: 3,
};

export default function PostCard(props: IPost) {
  const { id, title, author, body, price, image, location, amount } = props;
  return (
    <Grid
      container
      overflow="hidden"
      sx={{
        backgroundColor: "grey.100",
        borderRadius: 2,
      }}
    >
      <Grid item display="flex" justifyContent="space-between" m={2} xs={12}>
        <CardHeader {...author} />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        position="relative"
        sx={{
          height: {
            xs: 300,
            md: 200,
          },
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <CardContent {...props} />
      </Grid>
    </Grid>
  );
}
