import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class LoginRequest {
  @ApiProperty({ type: () => String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: () => String })
  password: string;
}

export class LoginResponse {
  message: string;
  userId: number;
  username: string;
  role: string;
}

export class AccountMetadata {
  userId: number;
  username: string;
  role: string;
}

export class LogoutRequest {}

export class LogoutResponse {
  message: string;
}
