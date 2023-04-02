export type Request = {
  id: number;
  customerName: string;
  tripName: string;
  startDate: string;
  endDate: string;
  price: number;
  numCustomer: number;
  status: number;
};
export type Booking = {
  id: number;
  bookingStatus: string;
  startDate: string;
  endDate: string;
  postId: number;
};
export interface IContentProps {
  bookings: Booking[];
  update: number;
  setUpdate: (update: number) => void;
}
export interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export interface INewRequestProps {
  bookings: Booking[];
  handleConfirm: (request: Booking) => void;
  handleDecline: (request: Booking) => void;
}
export interface IAcceptedRequestProps {
  bookings: Booking[];
  handleCancel: (request: Booking) => void;
}
export interface ICanceledRequestProps {
  bookings: Booking[];
}
