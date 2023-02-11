import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role, Guide, Review } from 'database';

export class CreateUserDto {
  // @ApiProperty({ type: Number })
  // id: number

  // @ApiProperty({ type: Date })
  // createdAt: Date

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  hashPassword: string;

  @ApiProperty({ type: String })
  firstName: string;

  @ApiProperty({ type: String })
  lastName: string;

  // @ApiProperty({ enum: Role, enumName: 'Role' })
  // role: Role = Role.USER

  // @ApiPropertyOptional()
  // Guide?: Guide

  @ApiProperty({ isArray: true })
  Review: Review[];
}
