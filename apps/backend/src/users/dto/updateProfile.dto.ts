import { Optional } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Role, Guide, Review } from 'database';

export class UpdateProfileDto {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  username?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  hashPassword?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  firstName?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  lastName?: string;
}
