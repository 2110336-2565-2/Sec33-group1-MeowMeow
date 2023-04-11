import { ReportQueryValid } from "@/hooks/useReportQuery";
import { ReportLabel } from "./createDropdownData";

export type ReportEntrace = "dashboard" | "trip" | "guide" | "bugs";

const checkReportEntrance = (isQueryValid: ReportQueryValid) => {
  const { isGuideIdValid, isTripIdValid } = isQueryValid;
  if (!isGuideIdValid && !isTripIdValid) {
    return "dashboard";
  }
  if (!isGuideIdValid && isTripIdValid) {
    return "trip";
  }
  if (isGuideIdValid && !isTripIdValid) {
    return "guide";
  }
  return "bugs";
};

export const reportLabelMapping = (reportEntrance: ReportEntrace) => {
  if (reportEntrance === "guide") {
    return ReportLabel.GUIDE;
  }
  if (reportEntrance === "trip") {
    return ReportLabel.TRIP;
  }
  if (reportEntrance === "dashboard") {
    return ReportLabel.SYSTEM;
  }
  return "";
};

export default checkReportEntrance;
