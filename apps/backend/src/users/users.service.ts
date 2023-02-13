import { Injectable } from '@nestjs/common';
import { Prisma } from 'database';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          createdAt: new Date(),
          email: createUserDto.email,
          username: createUserDto.username,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          hashPassword: createUserDto.hashPassword,
          role: 'USER',
        },
      });
      return user;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          e.message = `There is a unique constraint violation, ${e.meta.target} have already been used`;
          console.log(e.message);
        }
      }
      throw e;
    }
  }
  async updateProfile(updateId: number, updateProfileDto: UpdateProfileDto) {
    try {
      console.log(updateProfileDto);
      const updateUser = await this.prisma.user.update({
        where: {
          id: 20,
        },
        data: updateProfileDto,
      });
    } catch (e) {}
  }
}
