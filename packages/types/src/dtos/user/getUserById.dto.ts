import { IsInt } from "class-validator";

export class GetUserByIdRequest {
  @IsInt()
  id: number;
}

export class GetUserByIdResponse {
  message: string;
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}
