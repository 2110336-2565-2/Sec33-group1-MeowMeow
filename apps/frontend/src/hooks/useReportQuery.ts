import apiClient from "@/utils/apiClient";
import { ReportLabel } from "@/utils/createDropdownData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const getGuideById = async (id: string) => {
  if (!id) {
    return;
  }
  const response = await apiClient.get(`/guides/${id}`);
  return response.data;
};

const getTripById = async (id: string) => {
  if (!id) {
    return;
  }
  const response = await apiClient.get(`/posts/${id}`);
  return response.data;
};

export type ReportQueryValid = {
  isGuideIdValid: boolean;
  isTripIdValid: boolean;
};

interface IUseReportQuery {}

const useReportQuery = () => {
  const router = useRouter();
  const { guideId, tripId } = router.query as {
    guideId: string;
    tripId: string;
  };
  const [isQueryValid, setQueryValid] = useState<ReportQueryValid>({
    isGuideIdValid: false,
    isTripIdValid: false,
  });

  useEffect(() => {
    const checkValidGuide = async () => {
      if (!guideId) {
        setQueryValid((prev) => ({ ...prev, isGuideIdValid: false }));
        return;
      }
      try {
        await getGuideById(guideId);
        setQueryValid((prev) => ({ ...prev, isGuideIdValid: true }));
      } catch (err) {
        setQueryValid((prev) => ({ ...prev, isGuideIdValid: false }));
      }
    };
    checkValidGuide();
  }, [guideId]);

  useEffect(() => {
    const checkValidTrip = async () => {
      if (!tripId) {
        setQueryValid((prev) => ({ ...prev, isTripIdValid: false }));
        return;
      }
      try {
        await getTripById(guideId);
        setQueryValid((prev) => ({ ...prev, isTripIdValid: true }));
      } catch (err) {
        setQueryValid((prev) => ({ ...prev, isTripIdValid: false }));
      }
    };
    checkValidTrip();
  }, [tripId]);

  return { guideId, tripId, isQueryValid };
};

export default useReportQuery;
