import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma/prisma.service';
import { BookingsRepository } from './bookings.repository';
import { BookingsService, IBookingsService } from './bookings.service';

describe('BookingsService', () => {
  let service: IBookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [BookingsService, BookingsRepository, PrismaService],
    }).compile();

    service = module.get<IBookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
