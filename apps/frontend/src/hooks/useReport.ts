import checkReportEntrance, {
  reportLabelMapping,
} from "@/utils/checkReportEntrance";
import { ReportLabel } from "@/utils/createDropdownData";
import { useEffect, useMemo, useState } from "react";
import { ReportQueryValid } from "./useReportQuery";
import { SelectChangeEvent } from "@mui/material";

const useReport = (isQueryValid: ReportQueryValid) => {
  const reportEntrance = useMemo(() => {
    return checkReportEntrance(isQueryValid);
  }, [isQueryValid]);
  const [reportType, setReportType] = useState<ReportLabel | "">("");
  const onChange = (event: SelectChangeEvent<ReportLabel>) => {
    setReportType(event.target.value as ReportLabel);
  };

  useEffect(() => {
    setReportType(reportLabelMapping(reportEntrance));
  }, [reportEntrance]);

  return { reportEntrance, reportType, onChange };
};

export default useReport;
