export interface IUser {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
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
}
