import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role, Guide, Review } from 'database';

export class CreateUserDto {
  // @ApiProperty({ type: Number })
  // id: number

  // @ApiProperty({ type: Date })
  // createdAt: Date

  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  hashPassword: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  lastName: string;

  // @ApiProperty({ enum: Role, enumName: 'Role' })
  // role: Role = Role.USER

  // @ApiPropertyOptional()
  // Guide?: Guide

  // @ApiProperty({ isArray: true })
  // Review: Review[];
}
