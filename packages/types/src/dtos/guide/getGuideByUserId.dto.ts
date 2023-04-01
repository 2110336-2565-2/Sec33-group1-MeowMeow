import { ApiProperty, PickType } from "@nestjs/swagger";
import { Guide } from "./guide.dto";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "database";

export class GetGuideByUserIdRequest {}

export class GetGuideByUserIdResponse extends PickType(Guide, [
  "guideId",
  "userId",
  "firstName",
  "lastName",
  "certificateId",
  "averageReviewScore",
  "locations",
  "tourStyles",
] as const) {
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
    description: "user roles",
    example: [Role.USER],
  })
  roles: string[];
}
