export interface IGetProfileResponse {
  message: string;
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}
export type IProfileData = Omit<IGetProfileResponse, "id" | "message">;
