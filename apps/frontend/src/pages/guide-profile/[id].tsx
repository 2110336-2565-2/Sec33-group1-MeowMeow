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
  imageId: string;
}
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
    imageId: "",
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
  return (
    <AuthProvider roleAllowed={["USER"]}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Content
          name={guideData.firstName + " " + guideData.lastName}
          certificateId={guideData.certificateId}
          imageurl={guideData.imageId}
          tagsTourStyle={guideData.tourStyles}
          tagsLocation={guideData.locations}
          reviews={reviews}
          averageReviewScore={guideData.averageReviewScore}
          newLimit={() => setPage(page + 1)}
        ></Content>
      </Box>
    </AuthProvider>
  );
}
