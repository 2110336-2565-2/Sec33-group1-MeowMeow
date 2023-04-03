export const Roles = { USER: "USER", GUIDE: "GUIDE", ADMIN: "ADMIN" };
export type Roles_Types = keyof typeof Roles;

export interface IUser {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  roles: Roles_Types[];
  imageId?: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IProfileResponse {
  message: string;
  id: IUser["id"];
  email: IUser["email"];
  username: IUser["username"];
  firstName: IUser["firstName"];
  lastName: IUser["lastName"];
  roles: IUser["roles"];
  imageId?: IUser["imageId"];
}
