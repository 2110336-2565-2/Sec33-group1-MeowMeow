import { IsInt, IsNumberString } from 'class-validator';

export class GetUserByIdRequest {
  @IsNumberString()
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
