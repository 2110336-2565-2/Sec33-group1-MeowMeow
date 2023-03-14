import { statusType } from "./statusHandle";

export interface IData {
  name: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  participant: number;
  price: number;
  lineid: string;
  status: statusType;
}

export interface IStatus {
  description: string;
  color: string;
}

export type Order = "asc" | "desc";
