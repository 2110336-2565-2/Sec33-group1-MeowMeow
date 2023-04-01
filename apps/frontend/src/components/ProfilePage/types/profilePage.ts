export interface IProfileData {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}

export interface IGuideProfileResponse {
  guideId: number;
  userId: number;
  firstName: string;
  lastName: string;
  certificateId: string;
  averageReviewScore: number;
  locations: string[];
  tourStyles: string[];
  email: string;
  username: string;
  roles: string[];
}

export interface IMediaResponse {
  message: string;
  file: string;
}

export type IGuideProfile = Pick<
  IGuideProfileResponse,
  "certificateId" | "averageReviewScore" | "locations" | "tourStyles"
>;
