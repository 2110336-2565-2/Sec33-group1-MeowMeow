import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "database";

export class User {
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
    example: "password",
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

  @ApiProperty({
    type: () => String,
    description: "status message",
    example: "success",
  })
  message: string;

  @ApiProperty({
    type: () => Number,
    description: "user id",
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: () => String,
    description: "user roles",
    example: [Role.USER],
  })
  roles: string[];
}
