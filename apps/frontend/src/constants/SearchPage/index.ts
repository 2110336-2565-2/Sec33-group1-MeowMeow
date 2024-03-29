import { IFilterOptions } from "@/components/SearchPage/types";

export const POST_PER_PAGE = 5;

export const maxFee: number = 10000;
export const defaultMinRating: number = 0;
export const maxRating: number = 5;
export const stepFee: number = 100;
export const stepRating: number = 1;

export const initialValue: IFilterOptions = {
  location: "",
  maxPrice: maxFee,
  minRating: defaultMinRating,
};
