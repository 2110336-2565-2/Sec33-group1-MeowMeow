import { useRouter } from "next/router";
import React from "react";
import Navbar from "@/components/common/Navbar";
import Content from "@/components/guide-profile/Content";
import { Box } from "@mui/material";
interface Ireview {
  rating: number;
  timestamp: string;
  reviewer: string;
  detail: string;
}
export default function Guide_profile() {
  const router = useRouter();
  const { id } = router.query;

  const name = "John Cena";
  const desc =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione magni ipsa deleniti delectus nobis provident asperiores neque amet rerum modi adipisci possimus repellendus distinctio doloremque quasi sit, quis reiciendis iste?";
  const imageurl =
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
  const tagsTourStyle = [
    "Playful",
    "Knowledge",
    "Luxury",
    "Luxury1",
    "Luxury2",
    "Luxury3",
    "Luxury4",
  ];
  const tagsLocation = [
    "Bangkok",
    "Ayutthaya",
    "Ohio",
    "London",
    "London1",
    "London2",
    "London3",
  ];
  const accept = 60;
  const total = 100;
  const reviewCount: number[] = [8, 4, 2, 3, 1]; //5 to 1
  const reviews: Ireview[] = [
    {
      rating: 4.5,
      timestamp: "2023-02-10T:12:00:00",
      reviewer: "pasta spaghetti",
      detail:
        "potato tomato origano cocomo potato tomato origano cocomo potato tomato origano cocomo potato tomato origano cocomo potato tomato origano cocomo potato tomato origano cocomo",
    },
    {
      rating: 2,
      timestamp: "2023-01-10T:12:00:00",
      reviewer: "Alice Bob",
      detail:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim deleniti velit beatae. Officia reprehenderit sunt fugiat iusto consequuntur! Dolore quia minus, natus incidunt provident laudantium. Ipsum sunt sit libero cumque.",
    },
  ];
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Content
          name={name}
          desc={desc}
          imageurl={imageurl}
          tagsTourStyle={tagsTourStyle}
          tagsLocation={tagsLocation}
          accept={accept}
          total={total}
          reviewCount={reviewCount}
          reviews={reviews}
        ></Content>
      </Box>
    </>
  );
}
