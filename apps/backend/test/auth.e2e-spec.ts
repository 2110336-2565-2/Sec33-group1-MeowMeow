import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as request from 'supertest';
import * as console from 'console';

describe('auth', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    const prisma = app.get(PrismaService);
    await prisma.clean();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Basic CRUD', function () {
    const user = {
      email: 'email@test.com',
      username: 'testUsername',
      password: 'Password123!@#',
      firstName: 'testAuthFirstName',
      lastName: 'testAuthLastName',
      id: '',
      accToken: '',
      reToken: '',
    };

    beforeAll(function () {
      app.get(PrismaService).clean();
    });

    it('create user', async function () {
      const res = await request(app.getHttpServer())
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send({
          email: user.email,
          password: user.password,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        })
        .expect(201);
      expect(res.body).toHaveProperty('id');
      user.id = res.body.id;
    });

    it('update user', async function () {
      const res = await request(app.getHttpServer())
        .post('/auth/sign-in')
        .set('Content-Type', 'application/json')
        .send({
          email: user.email,
          password: user.password,
        })
        .expect(201);
      expect(res.header).toHaveProperty('set-cookie');
      user.accToken = res.header['set-cookie'][0].split(';')[0].split('=')[1];
      user.reToken = res.header['set-cookie'][1].split(';')[0].split('=')[1];
      console.log(user);
    });
  });
});
