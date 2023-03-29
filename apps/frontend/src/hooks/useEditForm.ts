import React, { useEffect } from "react";

export interface IEditPostForm {
  title: string;
  locations: string[];
  tags: string[];
  content: string;
  fee: number;
  maxParticipant: number;
  contactInfo: string;
}

export interface IUseEditPostForm {
  methodType: "POST" | "PUT";
}

const useEditPostForm = ({ methodType }: IUseEditPostForm) => {
  const [formBody, setFormBody] = React.useState<IEditPostForm>({
    title: "",
    locations: [],
    tags: [],
    content: "",
    fee: 0.0,
    maxParticipant: 0,
    contactInfo: "",
  });

  // Get Data Post from API Here
  //
  // Mock Data
  if (methodType === "PUT") {
    useEffect(() => {
      setFormBody({
        title: "Trip to Phuket",
        locations: ["Phuket"],
        tags: ["Fun-trip", "Amazing"],
        content: "Trip to Phuket",
        fee: 100.56,
        maxParticipant: 10,
        contactInfo: "contactInfo",
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
