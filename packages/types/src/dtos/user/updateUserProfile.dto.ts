import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from "@nestjs/swagger";
import { CreateUserRequest } from "./createUser.dto";
import { User } from "./user.dto";

export class UpdateUserRequest extends PartialType(CreateUserRequest) {}

export class UpdateUserResponse extends IntersectionType(
  OmitType(UpdateUserRequest, ["password"] as const),
  PickType(User, ["message"] as const)
) {}
