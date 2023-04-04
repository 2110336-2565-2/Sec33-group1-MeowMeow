import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class LoginRequest {
  @ApiProperty({
    type: () => String,
    description: "user's email",
    example: "john@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: () => String,
    description: "user's password",
    example: "password",
  })
  password: string;
}

export class LoginResponse {
  message: string;
  userId: number;
  username: string;
  roles: string[];
}

export class AccountMetadata {
  userId: number;
  username: string;
  roles: string[];
}

export class LogoutRequest {}

export class LogoutResponse {
  message: string;
}
