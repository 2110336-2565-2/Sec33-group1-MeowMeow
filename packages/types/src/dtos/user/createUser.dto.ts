import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserRequest {
  @ApiProperty({
    type: () => String,
    required: true,
    description: "email",
    example: "john@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "username",
    example: "user1",
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "password",
    example: "s3cr3t",
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "firstname",
    example: "john",
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: () => String,
    required: true,
    description: "lastname",
    example: "doe",
  })
  @IsNotEmpty()
  lastName: string;
}

export class CreateUserResponse {
  message: string;
  id: number;
  username: string;
  role: string;
}
