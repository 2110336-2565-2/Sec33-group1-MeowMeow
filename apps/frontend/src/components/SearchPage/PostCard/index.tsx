import { Grid } from "@mui/material";
import Image from "next/image";
import { IPost } from "../types";
import CardContent from "./CardContent";
import CardHeader from "./CardHeader";

const myName = "John Doe";

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
  const { title, author, image } = props;
  return (
    <Grid
      container
      overflow="hidden"
      boxShadow={2}
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
      }}
    >
      <Grid
        item
        display="flex"
        justifyContent="space-between"
        py={1}
        px={2}
        xs={12}
      >
        <CardHeader {...author} isOwner={myName === author.name} />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        position="relative"
        sx={{
          height: {
            xs: 300,
            md: "auto",
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
