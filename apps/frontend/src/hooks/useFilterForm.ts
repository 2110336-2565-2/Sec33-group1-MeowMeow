import { IFilterOptions } from "@/components/SearchPage/types";
import { initialValue } from "@/constants/SearchPage";
import { ChangeEvent, FormEvent, useState } from "react";

export interface IFilterMethod {
  options: IFilterOptions;
  tempOptions: IFilterOptions;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChangeLocation: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangePrice: (e: Event, newValue: number | number[]) => void;
  handleChangeRating: (e: Event, newValue: number | number[]) => void;
  handleChangeStartDate: (newValue: Date | null) => void;
  handleChangeEndDate: (newValue: Date | null) => void;
  reset: () => void;
}

const useFilterForm = () => {
  const [options, setOptions] = useState<IFilterOptions>(initialValue);

  const [tempOptions, setTempOptions] = useState<IFilterOptions>(options); // temp options for form submission

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOptions(tempOptions); // update global options in search module
  };

  const reset = () => {
    setTempOptions(initialValue);
  };

  const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempOptions((prev) => ({
      ...prev,
      location: e.target.value,
    }));
  };

  const handleChangePrice = (e: Event, newValue: number | number[]) => {
    setTempOptions((prev) => ({
      ...prev,
      price: newValue as number[],
    }));
  };

  const handleChangeRating = (e: Event, newValue: number | number[]) => {
    setTempOptions((prev) => ({
      ...prev,
      rating: newValue as number[],
    }));
  };

  const handleChangeStartDate = (newValue: Date | null) => {
    setTempOptions((prev) => ({
      ...prev,
      startDate: newValue,
    }));
  };

  const handleChangeEndDate = (newValue: Date | null) => {
    setTempOptions((prev) => ({
      ...prev,
      endDate: newValue,
    }));
  };

  return {
    options,
    tempOptions,
    handleSubmit,
    handleChangeLocation,
    handleChangePrice,
    handleChangeRating,
    handleChangeStartDate,
    handleChangeEndDate,
    reset,
  };
};

export default useFilterForm;
