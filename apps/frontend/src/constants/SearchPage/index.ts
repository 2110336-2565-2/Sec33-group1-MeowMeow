import { IPost } from "@/components/SearchPage/types";

export const POST_PER_PAGE = 5;

export const templatePost: Partial<IPost> = {
  author: {
    id: 1,
    name: "Placeholder Name",
    profile: "/images/searchPage/profile.jpeg", // webp is better
  },
  image: "/landing/travel1.png", // post
};

export const initialValue = {
  location: "",
  price: [0, 9999],
  rating: [0, 5],
  startDate: null,
  endDate: null,
};
