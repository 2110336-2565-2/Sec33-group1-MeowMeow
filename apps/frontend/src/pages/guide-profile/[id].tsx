import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/common/Navbar";
import Content from "@/components/guide-profile/Content";
import { Box } from "@mui/material";
import AuthProvider from "@/context/AuthContext";
import apiClient from "@/utils/apiClient";
interface IReview {
  guideId: number;
  reviewId: number;
  reviewerId: string;
  score: number;
  publishDate: string;
  text: string;
}
interface IGuide {
  guideId: number;
  userId: number;
  firstName: string;
  lastName: string;
  certificateId: string;
  averageReviewScore: number;
  locations: string[];
  tourStyles: string[];
}
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
const getData = async (id: string) => {
  const response = await apiClient.get("guides/" + id);
  return response;
};
const getReview = async (id: string, page: number) => {
  const response = await apiClient.get("guides/" + id + "/reviews/" + page);
  return response;
};
export default function GuideProfile() {
  const [guideData, setGuideData] = useState<IGuide>({
    guideId: 1,
    userId: 1,
    firstName: "name",
    lastName: "lastname",
    certificateId: "aaaaaaaab",
    averageReviewScore: 3,
    locations: [""],
    tourStyles: [""],
  });
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!id) return;
      const data = await getData(id as string);
      setGuideData(data.data);
    };
    fetchUserProfile();
  }, [id]);
  useEffect(() => {
    const fetchReviews = async () => {
      if (!id) return;
      setLoading(true);
      const data = await getReview(id as string, page as number);
      setReviews([...reviews, ...data.data]);
      setLoading(false);
    };
    fetchReviews();
  }, [id, page]);
  const loadMoreItems = async () => setPage(page + 1);
  return (
    <AuthProvider roleAllowed={["USER"]}>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Content
          name={guideData.firstName + " " + guideData.lastName}
          certificateId={guideData.certificateId}
          imageurl={imageurl}
          tagsTourStyle={guideData.tourStyles}
          tagsLocation={guideData.locations}
          accept={accept}
          total={total}
          reviewCount={[1, 2, 3, 4, 5]}
          reviews={reviews}
          averageReviewScore={guideData.averageReviewScore}
          newLimit={() => setPage(page + 1)}
        ></Content>
      </Box>
    </AuthProvider>
  );
}
