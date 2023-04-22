import { Test } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserByIdResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from 'types';
import { PropertyAlreadyUsedError, UserNotFoundError } from './users.common';
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUsersService = {
    getUserById: null,
    create: null,
    updateUser: null,
  };
  const userData = {
    1: {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'john@example.com',
      username: 'user1',
      hashedPassword: 'HASHED',
      firstName: 'john',
      lastName: 'doe',
      imageId: null,
      roles: ['USER'],
    },
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [UsersController],
      providers: [
        {
          provide: 'UsersService',
          useValue: mockUsersService,
        },
        {
          provide: UsersRepository,
          useValue: {},
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();
    controller = moduleRef.get<UsersController>(UsersController);
    mockUsersService.getUserById = jest.fn();
    mockUsersService.getUserById.mockImplementation(
      (id: number): GetUserByIdResponse => {
        if (!userData[id])
          throw new UserNotFoundError('user with given id not found');
        return {
          message: 'success',
          id: userData[id].id,
          email: userData[id].email,
          username: userData[id].username,
          firstName: userData[id].firstName,
          lastName: userData[id].lastName,
          roles: userData[id].roles,
          imageId: userData[id].imageId,
        };
      },
    );
    mockUsersService.create = jest.fn();
    mockUsersService.create.mockImplementation(
      (req: CreateUserRequest): CreateUserResponse => {
        return {
          message: 'success',
          id: 1,
          username: req.username,
        };
      },
    );
    mockUsersService.updateUser = jest.fn();
    mockUsersService.updateUser.mockImplementation(
      (id: number, updates: UpdateUserRequest): UpdateUserResponse => {
        if (!userData[id])
          throw new UserNotFoundError('user with given id not found');
        return {
          message: 'success',
          email: updates.email ?? userData[id].email,
          username: updates.username ?? userData[id].username,
          firstName: updates.firstName ?? userData[id].firstName,
          lastName: updates.lastName ?? userData[id].lastName,
          imageId: updates.imageId ?? userData[id].imageId,
        };
      },
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('handleException', () => {
    it('should throw 409 error if receive PropertyAlreadyUsedError', () => {
      expect(() => {
        controller.handleException(new PropertyAlreadyUsedError('ERRMSG'));
      }).toThrow(new HttpException('ERRMSG', HttpStatus.CONFLICT));
    });
    it('should throw 404 error if receive UserNotFoundError', () => {
      expect(() => {
        controller.handleException(new UserNotFoundError('ERRMSG'));
      }).toThrow(
        new HttpException('user with given id not found', HttpStatus.NOT_FOUND),
      );
    });
    it('should throw 500 error if receive any other exception', () => {
      expect(() => {
        controller.handleException(new ForbiddenException('ERRMSG'));
      }).toThrow(
        new HttpException(
          'internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      expect(() => {
        controller.handleException(new BadRequestException('ERRMSG'));
      }).toThrow(
        new HttpException(
          'internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
