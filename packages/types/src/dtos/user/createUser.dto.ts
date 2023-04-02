import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserRequest {
  @ApiProperty({ type: () => String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: () => String })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: () => String })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: () => String })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: () => String })
  @IsNotEmpty()
  lastName: string;
}

export class CreateUserResponse {
  message: string;
  id: number;
  username: string;
  role: string;
}
