import {
  ApiPropertyOptional,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from "@nestjs/swagger";
import { CreateUserRequest } from "./createUser.dto";
import { User } from "./user.dto";

export class UpdateUserRequest extends PartialType(CreateUserRequest) {
  @ApiPropertyOptional({
    type: () => String,
    example: "1235-183C",
  })
  imageId: string;
}

export class UpdateUserResponse extends IntersectionType(
  OmitType(UpdateUserRequest, ["password"] as const),
  PickType(User, ["message"] as const)
) {}
