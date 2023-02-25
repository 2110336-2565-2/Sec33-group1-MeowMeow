import { IFilterOptions } from "@/components/SearchPage/types";
import { useState } from "react";

export type TFilterForm = {
  options: IFilterOptions;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChangeLocation: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePrice: (e: Event, newValue: number | number[]) => void;
  handleChangeRating: (e: Event, newValue: number | number[]) => void;
  handleChangeStartDate: (newValue: Date | null) => void;
  handleChangeEndDate: (newValue: Date | null) => void;
};
const useFilterForm = () => {
  const [options, setOptions] = useState<IFilterOptions>({
    location: "",
    price: [0, 1000],
    rating: [0, 5],
    startDate: null,
    endDate: null,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: submit form
  };

  const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions((prev) => ({
      ...prev,
      location: e.target.value,
    }));
  };

  const handleChangePrice = (e: Event, newValue: number | number[]) => {
    setOptions((prev) => ({
      ...prev,
      price: newValue as number[],
    }));
  };

  const handleChangeRating = (e: Event, newValue: number | number[]) => {
    setOptions((prev) => ({
      ...prev,
      rating: newValue as number[],
    }));
  };

  const handleChangeStartDate = (newValue: Date | null) => {
    setOptions((prev) => ({
      ...prev,
      startDate: newValue,
    }));
  };

  const handleChangeEndDate = (newValue: Date | null) => {
    setOptions((prev) => ({
      ...prev,
      endDate: newValue,
    }));
  };

  return {
    options,
    handleSubmit,
    handleChangeLocation,
    handleChangePrice,
    handleChangeRating,
    handleChangeStartDate,
    handleChangeEndDate,
  };
};

export default useFilterForm;
