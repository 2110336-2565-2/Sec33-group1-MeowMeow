import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService, UsersServiceImpl } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserNotFoundError } from './users.common';
import { Role, User } from 'database';
import { UsersRepository } from './users.repository';
import { CreateUserRequest } from 'types';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    getUserById: null,
    createUser: null,
    updateUserById: null,
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [UsersController],
      providers: [
        {
          provide: 'UsersService',
          useClass: UsersServiceImpl,
        },
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();
    service = moduleRef.get<UsersService>('UsersService');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserById', () => {
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

    beforeEach(() => {
      mockUsersRepository.getUserById = jest.fn();
      jest
        .spyOn(mockUsersRepository, 'getUserById')
        .mockImplementation(async (id: number): Promise<User> => {
          if (!userData[id]) return null;
          return userData[id];
        });
    });

    it('should return user', async () => {
      expect(await service.getUserById(1)).toStrictEqual({
        message: 'success',
        id: userData[1].id,
        email: userData[1].email,
        username: userData[1].username,
        firstName: userData[1].firstName,
        lastName: userData[1].lastName,
        roles: userData[1].roles,
        imageId: userData[1].imageId,
      });
      expect(mockUsersRepository.getUserById).toHaveBeenCalledTimes(1);
      expect(mockUsersRepository.getUserById).toHaveBeenCalledWith(1);
    });
    it('should throw UserNotFoundError', async () => {
      expect(service.getUserById(2)).rejects.toThrow(UserNotFoundError);
      expect(mockUsersRepository.getUserById).toHaveBeenCalledTimes(1);
      expect(mockUsersRepository.getUserById).toHaveBeenCalledWith(2);
    });
  });

  describe('creatUser', () => {
    const mockData: CreateUserRequest = {
      email: 'john@example.com',
      username: 'user1',
      firstName: 'john',
      lastName: 'doe',
      password: 'password',
    };
    let result = null;

    beforeEach(async () => {
      mockUsersRepository.createUser = jest.fn();
      jest
        .spyOn(mockUsersRepository, 'createUser')
        .mockImplementation(
          async (data: {
            email: string;
            username: string;
            firstName: string;
            lastName: string;
            hashedPassword: string;
            roles: Role[];
          }): Promise<User> => {
            return {
              id: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
              email: data.email,
              username: data.username,
              hashedPassword: data.hashedPassword,
              firstName: data.firstName,
              lastName: data.lastName,
              imageId: null,
              roles: data.roles,
            };
          },
        );
      result = await service.create(mockData);
    });
    it('should be called 1 time', async () => {
      expect(mockUsersRepository.createUser).toHaveBeenCalledTimes(1);
    });
    it('should call repository with arguments', async () => {
      expect(mockUsersRepository.createUser.mock.calls[0][0].email).toBe(
        mockData.email,
      );
      expect(mockUsersRepository.createUser.mock.calls[0][0].username).toBe(
        mockData.username,
      );
      expect(mockUsersRepository.createUser.mock.calls[0][0].firstName).toBe(
        mockData.firstName,
      );
      expect(mockUsersRepository.createUser.mock.calls[0][0].lastName).toBe(
        mockData.lastName,
      );
      expect(
        mockUsersRepository.createUser.mock.calls[0][0].roles,
      ).toStrictEqual([Role.USER]);
      expect(
        typeof mockUsersRepository.createUser.mock.calls[0][0].hashedPassword,
      ).toBe('string');
    });
    it('password should be hash', async () => {
      expect(
        bcrypt.compare(
          mockData.password,
          mockUsersRepository.createUser.mock.calls[0][0].hashedPassword,
        ),
      ).toBeTruthy();
    });
    it('should return', async () => {
      expect(result).toStrictEqual({
        message: 'success',
        id: 1,
        username: mockData.username,
      });
    });
  });

  describe('updateUser', () => {
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

    beforeEach(() => {
      mockUsersRepository.updateUserById = jest.fn();
      jest.spyOn(mockUsersRepository, 'updateUserById').mockImplementation(
        async (
          id: number,
          update: {
            email?: string;
            username?: string;
            firstName?: string;
            lastName?: string;
            hashedPassword?: string;
            imageId?: string;
          },
        ): Promise<User> => {
          if (!userData[id]) return null;
          return {
            ...userData[id],
            email: update.email ?? userData[id].email,
            username: update.username ?? userData[id].username,
            firstName: update.firstName ?? userData[id].firstName,
            lastName: update.lastName ?? userData[id].lastName,
            hashedPassword:
              update.hashedPassword ?? userData[id].hashedPassword,
            imageId: update.imageId ?? userData[id].imageId,
          };
        },
      );
    });
    it('should throw UserNotFoundError', async () => {
      expect(service.updateUser(2, {})).rejects.toThrow(UserNotFoundError);
      expect(mockUsersRepository.updateUserById).toHaveBeenCalledTimes(1);
    });
    it('should return update value', async () => {
      const result = await service.updateUser(1, {
        email: 'jane@example.com',
        firstName: 'newFirstName',
        lastName: 'newLastName',
      });
      expect(result).toStrictEqual({
        message: 'success',
        email: 'jane@example.com',
        username: userData[1].username,
        firstName: 'newFirstName',
        lastName: 'newLastName',
        imageId: userData[1].imageId,
      });
      expect(mockUsersRepository.updateUserById).toHaveBeenCalledTimes(1);
    });
    it('password should be hash', async () => {
      await service.updateUser(1, {
        password: 'newPassword',
      });
      expect(
        bcrypt.compareSync(
          'newPassword',
          mockUsersRepository.updateUserById.mock.calls[0][1].hashedPassword,
        ),
      ).toBeTruthy();
      expect(mockUsersRepository.updateUserById).toHaveBeenCalledTimes(1);
    });
  });
});
