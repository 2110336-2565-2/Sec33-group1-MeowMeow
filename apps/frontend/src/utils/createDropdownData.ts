import { IReportDropdown } from "@/components/report/TypeSelect";
import { ReportEntrace } from "./checkReportEntrance";

export enum ReportLabel {
  "GUIDE" = "GUIDE",
  "TRIP" = "TRIP",
  "SYSTEM" = "SYSTEM",
  "OTHER" = "OTHER",
}

const SUPPORT_DATA_ALL = [
  { name: "GUIDE มีพฤติกรรมไม่เหมาะสม", value: ReportLabel.GUIDE },
  { name: "ปัญหาจากการไปเที่ยว", value: ReportLabel.TRIP },
  { name: "ระบบขัดข้อง", value: ReportLabel.SYSTEM },
  { name: "อื่นๆ", value: ReportLabel.OTHER },
];
const SUPPORT_DATA_TRIP = [SUPPORT_DATA_ALL[1], SUPPORT_DATA_ALL[3]];
const SUPPORT_DATA_GUIDE = [SUPPORT_DATA_ALL[0], SUPPORT_DATA_ALL[3]];
const SUPPORT_DATA_DASHBOARD = [SUPPORT_DATA_ALL[2], SUPPORT_DATA_ALL[3]];
const SUPPORT_DATA_BUGS = SUPPORT_DATA_ALL;

const createDropdownData = (reportEntrance: string): IReportDropdown[] => {
  if (reportEntrance === "dashboard") {
    return SUPPORT_DATA_DASHBOARD;
  }
  if (reportEntrance === "trip") {
    return SUPPORT_DATA_TRIP;
  }
  if (reportEntrance === "guide") {
    return SUPPORT_DATA_GUIDE;
  }
  return SUPPORT_DATA_BUGS;
};

export default createDropdownData;
