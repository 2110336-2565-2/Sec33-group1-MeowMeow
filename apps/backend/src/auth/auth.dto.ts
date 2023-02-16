import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNumberString,
  IsStrongPassword,
} from 'class-validator';

export class LoginRequest {
  @IsEmail()
  email: string;

  @IsStrongPassword({ minLength: 8 })
  password: string;
}

export class LoginResponse {
  message: string;
}

export class AccountMetadata {
  @IsInt()
  userId: number;

  username: string;

  role: string;
}

export class LogoutRequest {}

export class LogoutResponse {
  message: string;
}
