import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserRequest {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  username?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  firstName?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  lastName?: string;
}

export class UpdateUserResponse {
  message: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}
