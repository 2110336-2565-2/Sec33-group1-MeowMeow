import { Grid } from "@mui/material";
import Image from "next/image";
import { IPost } from "../types";
import CardContent from "./CardContent";
import CardHeader from "./CardHeader";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const PostCard = (props: IPost) => {
  const { title, author, image, id } = props;
  const { user } = useContext(AuthContext);

  if (!user) return <></>;

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
        <CardHeader
          {...author}
          postId={id}
          authorId={author.id}
          currentUserId={user!.id}
        />
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
        <CardContent
          {...props}
          authorId={author.id}
          postId={id}
          travellerId={user!.id}
        />
      </Grid>
    </Grid>
  );
};

export default PostCard;
