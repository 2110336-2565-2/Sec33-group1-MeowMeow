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

export const maxFee: number = 10000;
export const maxRating: number = 5;
export const stepFee: number = 100;
export const stepRating: number = 1;

export const initialValue = {
  location: "",
  price: [0, maxFee],
  rating: [0, maxRating],
  startDate: null,
  endDate: null,
};
