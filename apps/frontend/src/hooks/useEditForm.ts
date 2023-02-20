import React, { useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

export interface IEditPostForm {
  tripName: string;
  location: string;
  startDate: Dayjs;
  endDate: Dayjs;
  description: string;
  price: number;
  maxParticipant: number;
  lineid: string;
}

export interface IUseEditPostForm {
  methodType: "POST" | "PUT";
}

const useEditPostForm = ({ methodType }: IUseEditPostForm) => {
  const [formBody, setFormBody] = React.useState<IEditPostForm>({
    tripName: "",
    location: "",
    startDate: dayjs(undefined),
    endDate: dayjs(undefined),
    description: "",
    price: 0.0,
    maxParticipant: 0,
    lineid: "",
  });

  // Get Data Post from API Here
  //
  // Mock Data
  if (methodType === "PUT") {
    useEffect(() => {
      setFormBody({
        tripName: "Trip to Phuket",
        location: "Phuket",
        startDate: dayjs("2021-10-10"),
        endDate: dayjs("2021-10-20"),
        description: "Trip to Phuket",
        price: 100.56,
        maxParticipant: 10,
        lineid: "lineid",
      });
    }, []);
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormBody({ ...formBody, [name]: value });
  };

  return { formBody, onChange };
};

export default useEditPostForm;
