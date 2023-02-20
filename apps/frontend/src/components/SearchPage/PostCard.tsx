import { LocationOn, MoreHoriz, Paid, People } from "@mui/icons-material";
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { IPost } from "./types";

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

interface ICardContent {
  title: string;
  body: string;
  price: number;
  location: string;
  amount: number;
}

const CardContent = (props: ICardContent) => {
  const { title, body, price, location, amount } = props;
  return (
    <Box m={2} flexGrow={1}>
      <Box mb={2}>
        <Typography variant="h6">{title}</Typography>

        <Typography variant="subtitle2">
          <LocationOn fontSize="inherit" />
          {location}s
        </Typography>
      </Box>
      <Typography variant="body2">Amount : {amount} people</Typography>
      <Typography variant="body2">Rate : {price} ฿</Typography>
      <Typography variant="body2">{body}</Typography>
    </Box>
  );
};

interface ICardHeader {
  profile: string;
  name: string;
}

const CardHeader = (props: ICardHeader) => {
  const { profile, name } = props;
  return (
    <>
      <Box display="flex" gap={2}>
        <Avatar
          src={profile}
          sx={{
            width: 32,
            height: 32,
          }}
        />
        <Typography variant="h6">{name}</Typography>
      </Box>
      <IconButton>
        <MoreHoriz />
      </IconButton>
    </>
  );
};
