import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService, UsersServiceImpl } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { UsersRepository } from './users.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [UsersController],
      providers: [
        {
          provide: 'UsersService',
          useClass: UsersServiceImpl,
        },
        UsersRepository,
        PrismaService,
      ],
    }).compile();

    service = moduleRef.get<UsersService>('UsersService');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
