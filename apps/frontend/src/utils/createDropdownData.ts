import { IReportDropdown } from "@/components/report/TypeSelect";

export enum ReportLabel {
  "GUIDE" = "GUIDE",
  "TRIP" = "TRIP",
  "SYSTEM" = "SYSTEM",
  "OTHER" = "OTHER",
}

const SUPPORT_DATA = [
  { name: "GUIDE มีพฤติกรรมไม่เหมาะสม", value: ReportLabel.GUIDE },
  { name: "ปัญหาจากการไปเที่ยว", value: ReportLabel.TRIP },
  { name: "ระบบขัดข้อง", value: ReportLabel.SYSTEM },
  { name: "อื่นๆ", value: ReportLabel.OTHER },
];

const createDropdownData = (): IReportDropdown[] => {
  return SUPPORT_DATA;
};

export default createDropdownData;
