import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginRequest {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword({ minLength: 8 })
  password: string;
}

export class LoginResponse {
  message: string;
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
