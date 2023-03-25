import { PickType } from "@nestjs/swagger";
import { IsInt } from "class-validator";
import { User } from "./user.dto";

export class GetUserByIdRequest extends PickType(User, ["id"] as const) {}

export class GetUserByIdResponse extends PickType(User, [
  "message",
  "id",
  "email",
  "username",
  "firstName",
  "lastName",
  "roles",
] as const) {}
