import { Optional } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role, Guide, Review } from 'database';

export class UpdateProfileDto {
  @ApiProperty({ type: String })
  @IsEmail()
  @Optional()
  email?: string;

  @ApiProperty({ type: String })
  @Optional()
  username?: string;

  @ApiProperty({ type: String })
  @Optional()
  hashPassword?: string;

  @ApiProperty({ type: String })
  @Optional()
  firstName?: string;

  @ApiProperty({ type: String })
  @Optional()
  lastName?: string;
}
