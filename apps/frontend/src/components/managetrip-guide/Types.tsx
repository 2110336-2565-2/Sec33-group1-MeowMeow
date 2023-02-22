<<<<<<< HEAD
type Request = {
  id: number;
  customerName: string;
  tripName: string;
  startDate: string;
  endDate: string;
  price: number;
  numCustomer: number;
  status: number;
};
export default Request;
export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export interface INewRequestProps {
  requests: Request[];
  confirmedRequests: Request[];
  cancelledRequests: Request[];
  handleConfirm: (request: Request) => void;
  handleCancel: (request: Request) => void;
}
export interface IAcceptedRequestProps {
  confirmedRequests: Request[];
  cancelledRequests: Request[];
  handleCancel: (request: Request) => void;
}
||||||| parent of f2437d0 (fix: move landing page to home page)
=======
type Request = {
    id: number,
    customerName: string,
    tripName: string,
    startDate: string,
    endDate: string,
    price:number,
    numCustomer:number
    status:number
  };
export default Request;
export interface TabPanelProps {
    children?: React.ReactNode,
    index: number,
    value: number
}
export interface INewRequestProps {
    requests:Request[],
    confirmedRequests:Request[],
    cancelledRequests:Request[],
    handleConfirm: (request:Request)=>void,
    handleCancel:(request:Request)=>void
}
export interface IAcceptedRequestProps {
    confirmedRequests:Request[],
    cancelledRequests:Request[],
    handleCancel:(request:Request)=>void
}
>>>>>>> f2437d0 (fix: move landing page to home page)
