import { ApiProperty, ApiPropertyOptional, PickType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { User } from "./user.dto";

export class CreateUserRequest extends PickType(User, [
  "email",
  "username",
  "password",
  "firstName",
  "lastName",
] as const) {}

export class CreateUserResponse extends PickType(User, [
  "message",
  "id",
  "username",
] as const) {}
