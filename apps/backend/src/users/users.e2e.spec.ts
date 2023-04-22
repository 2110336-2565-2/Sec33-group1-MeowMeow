import { Test } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { PrismaService } from '../prisma/prisma.service';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Role, User } from 'database';
import { UsersModule } from './users.module';
import { PropertyAlreadyUsedError } from './users.common';
import * as cookieParser from 'cookie-parser';
import * as bcrypt from 'bcrypt';

describe('UsersController', () => {
  let app: INestApplication;

  const userData = {
    2: {
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'jane@example.com',
      username: 'user2',
      hashedPassword: bcrypt.hashSync('password', 10),
      firstName: 'jane',
      lastName: 'doe',
      imageId: null,
      roles: [Role.USER],
    },
    3: {
      id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'jinny@example.com',
      username: 'user3',
      hashedPassword: bcrypt.hashSync('password', 10),
      firstName: 'jinny',
      lastName: 'doe',
      imageId: null,
      roles: [Role.USER],
    },
  };
  const mockUserRepo = {
    getUserByEmail(email: string): User {
      for (const user of Object.values(userData)) {
        if (user.email === email) {
          return user;
        }
      }
      return null;
    },
    getUserById: (id: number): User => {
      if (!userData[id]) {
        return null;
      }
      return userData[id];
    },
    createUser: (data: {
      email: string;
      username: string;
      firstName: string;
      lastName: string;
      hashedPassword: string;
      roles: Role[];
    }): User => {
      if (
        Object.values(userData).some(
          (user) =>
            user.email === data.email || user.username === data.username,
        )
      ) {
        throw new PropertyAlreadyUsedError(
          `There is a unique constraint violation, ${data.email} have already been used`,
        );
      }
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
    updateUserById: (
      id: number,
      update: {
        email?: string;
        username?: string;
        firstName?: string;
        lastName?: string;
        hashedPassword?: string;
        imageId?: string;
      },
    ): User => {
      if (!userData[id]) {
        return null;
      }
      return {
        ...userData[id],
        email: update.email ?? userData[id].email,
        username: update.username ?? userData[id].username,
        firstName: update.firstName ?? userData[id].firstName,
        lastName: update.lastName ?? userData[id].lastName,
        hashedPassword: update.hashedPassword ?? userData[id].hashedPassword,
        imageId: update.imageId ?? userData[id].imageId,
      };
    },
    addUserRole: (id: number, role: Role): User => {
      if (!userData[id]) return null;
      return { ...userData[id], roles: [...userData[id].roles, role] };
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .overrideProvider(UsersRepository)
      .useValue(mockUserRepo)
      .compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        forbidUnknownValues: false,
      }),
    );
    app.use(cookieParser());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('getUserProfile', () => {
    describe('user is not logged in', () => {
      it('should be Unauthorized', () => {
        return request(app.getHttpServer()).get('/users/profile').expect(401);
      });
    });
    describe('user is logged in', () => {
      it('should get profile data', async () => {
        const loginRes = await request(app.getHttpServer())
          .post('/auth/sign-in')
          .send({
            email: 'jane@example.com',
            password: 'password',
          })
          .expect(201);
        const loginCookie = loginRes
          .get('Set-Cookie')
          .map((e) => e.split(';')[0])
          .join(';');
        return request(app.getHttpServer())
          .get('/users/profile')
          .set('Cookie', loginCookie)
          .expect(200)
          .expect({
            message: 'success',
            id: userData[2].id,
            email: userData[2].email,
            username: userData[2].username,
            firstName: userData[2].firstName,
            lastName: userData[2].lastName,
            roles: userData[2].roles,
            imageId: userData[2].imageId,
          });
      });
    });
  });
  describe('getUserById', () => {
    describe('user exists', () => {
      it('should return user data', () => {
        return request(app.getHttpServer()).get('/users/2').expect(200).expect({
          message: 'success',
          id: userData[2].id,
          email: userData[2].email,
          username: userData[2].username,
          firstName: userData[2].firstName,
          lastName: userData[2].lastName,
          roles: userData[2].roles,
          imageId: userData[2].imageId,
        });
      });
    });
    describe('user not exists', () => {
      it('should be not found', () => {
        return request(app.getHttpServer()).get('/users/1').expect(404);
      });
    });
  });
  describe('createUser', () => {
    describe('TC2-1: firstname is an empty string', () => {
      it('should be BadRequest', () => {
        return request(app.getHttpServer())
          .post('/users/register')
          .send({
            email: 'john@example.com',
            username: 'user1',
            password: '12345678',
            firstName: '',
            lastName: 'doe',
          })
          .expect(400);
      });
    });
    describe('TC2-2: lastname is an empty string', () => {
      it('should be BadRequest', () => {
        return request(app.getHttpServer())
          .post('/users/register')
          .send({
            email: 'john@example.com',
            username: 'user1',
            password: '12345678',
            firstName: 'john',
            lastName: '',
          })
          .expect(400);
      });
    });
    describe('TC2-3: username is an empty string', () => {
      it('should be BadRequest', () => {
        return request(app.getHttpServer())
          .post('/users/register')
          .send({
            email: 'john@example.com',
            username: '',
            password: '12345678',
            firstName: 'john',
            lastName: 'doe',
          })
          .expect(400);
      });
    });
    describe('TC2-4: username is a non-empty string and username already exists in the system', () => {
      it('should be Conflict', () => {
        return request(app.getHttpServer())
          .post('/users/register')
          .send({
            email: 'john@example.com',
            username: 'user2',
            password: '12345678',
            firstName: 'john',
            lastName: 'doe',
          })
          .expect(409);
      });
    });
    describe('TC2-5: email is an empty string', () => {
      it('should be BadRequest', () => {
        return request(app.getHttpServer())
          .post('/users/register')
          .send({
            email: '',
            username: 'user1',
            password: '12345678',
            firstName: 'john',
            lastName: 'doe',
          })
          .expect(400);
      });
    });
    describe('TC2-6: email is a non-empty string but not in the correct format', () => {
      it('should be BadRequest', () => {
        return request(app.getHttpServer())
          .post('/users/register')
          .send({
            email: 'john@example',
            username: 'user1',
            password: '12345678',
            firstName: 'john',
            lastName: 'doe',
          })
          .expect(400);
      });
    });
    describe('TC2-7: email is a non-empty string in the correct format and email already exist in the system', () => {
      it('should be Conflict', () => {
        return request(app.getHttpServer())
          .post('/users/register')
          .send({
            email: 'jane@example.com',
            username: 'user1',
            password: '12345678',
            firstName: 'john',
            lastName: 'doe',
          })
          .expect(409);
      });
    });
    describe('TC2-8: password is an empty string', () => {
      it('should be BadRequest', () => {
        return request(app.getHttpServer())
          .post('/users/register')
          .send({
            email: 'john@example.com',
            username: 'user1',
            password: '',
            firstName: 'john',
            lastName: 'doe',
          })
          .expect(400);
      });
    });
    describe('TC2-9: password is a non-empty string which is shorter than 8 characters', () => {
      it('should be BadRequest', () => {
        return request(app.getHttpServer())
          .post('/users/register')
          .send({
            email: 'john@example.com',
            username: 'user1',
            password: '1234567',
            firstName: 'john',
            lastName: 'doe',
          })
          .expect(400);
      });
    });
    describe('TC2-10: all input is valid', () => {
      it('should be Created', () => {
        return request(app.getHttpServer())
          .post('/users/register')
          .send({
            email: 'john@example.com',
            username: 'user1',
            password: '12345678',
            firstName: 'john',
            lastName: 'doe',
          })
          .expect(201);
      });
    });
  });
  describe('editUserProfile', () => {
    describe('user is not logged in', () => {
      it('should be Unauthorized', () => {
        return request(app.getHttpServer()).put('/users').expect(401);
      });
    });
    describe('user is logged in', () => {
      it('should edit own profile data', async () => {
        const loginRes = await request(app.getHttpServer())
          .post('/auth/sign-in')
          .send({
            email: 'jane@example.com',
            password: 'password',
          })
          .expect(201);
        const loginCookie = loginRes
          .get('Set-Cookie')
          .map((e) => e.split(';')[0])
          .join(';');
        const res = await request(app.getHttpServer())
          .put('/users')
          .set('Cookie', loginCookie)
          .send({
            email: 'jane2@example.com',
            username: 'user2',
            password: '12345678',
            firstName: 'jane2',
            lastName: 'doe2',
          });
        expect(res.statusCode).toBe(201);
        expect(res.body).toStrictEqual({
          message: 'success',
          email: 'jane2@example.com',
          username: 'user2',
          firstName: 'jane2',
          lastName: 'doe2',
          imageId: null,
        });
      });
    });
  });
});
