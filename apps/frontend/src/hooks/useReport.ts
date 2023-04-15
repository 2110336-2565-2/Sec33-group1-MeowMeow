import checkReportEntrance, {
  reportLabelMapping,
} from "@/utils/checkReportEntrance";
import { ReportLabel } from "@/utils/createDropdownData";
import {
  FormEventHandler,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ReportQueryValid } from "./useReportQuery";
import { SelectChangeEvent } from "@mui/material";
import apiClient from "@/utils/apiClient";
import { CreateReportResponse } from "types";
import useCustomSnackbar from "./useCustomSnackbar";
import { NotificationContext } from "@/context/NotificationContext";
import { useRouter } from "next/router";

type PostReport = {
  reportType: ReportLabel;
  tripId?: string;
  guideId?: string;
  text: string;
};

const postReport = async (report: PostReport) => {
  const response = await apiClient.post<CreateReportResponse>(
    "/reports",
    report
  );
  return response.data;
};

const useReport = (isQueryValid: ReportQueryValid) => {
  const reportEntrance = useMemo(() => {
    return checkReportEntrance(isQueryValid);
  }, [isQueryValid]);

  const [reportType, setReportType] = useState<ReportLabel | "">("");
  const { addNotification } = useContext(NotificationContext);
  const router = useRouter();
  const onChange = (event: SelectChangeEvent<ReportLabel>) => {
    setReportType(event.target.value as ReportLabel);
  };
  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const { guideId, tripId, detail } =
        form.elements as typeof form.elements & {
          guideId: HTMLInputElement;
          tripId: HTMLInputElement;
          detail: HTMLInputElement;
        };

      console.log(reportType, detail);

      if (!reportType || !detail.value) {
        return;
      }

      try {
        await postReport({
          reportType,
          text: detail.value,
          guideId: guideId?.value,
          tripId: tripId?.value,
        });
        addNotification("success created report", "success");
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } catch (err) {
        addNotification("failed to create report ", "error");
      }
    },
    [reportType]
  );

  useEffect(() => {
    setReportType(reportLabelMapping(reportEntrance));
  }, [reportEntrance]);

  return { reportEntrance, reportType, onChange, onSubmit };
};

export default useReport;
