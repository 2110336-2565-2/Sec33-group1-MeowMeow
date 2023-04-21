import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma/prisma.service';
import { BookingsRepository } from './bookings.repository';
import { BookingsService, IBookingsService } from './bookings.service';
import { PostsModule } from '../posts/posts.module';
import { PaymentModule } from '../payment/payment.module';
import { HttpModule } from '@nestjs/axios';
import { UsersRepository } from '../users/users.repository';
import { PaymentRepository } from '../payment/payment.repository';
import { GuidesRepository } from '../guides/guides.repository';
import { MediaModule } from '../media/media.module';
import { GuidesModule } from '../guides/guides.module';

describe('BookingsService', () => {
  let service: IBookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        PostsModule,
        PaymentModule,
        MediaModule,
        GuidesModule,
        HttpModule,
      ],
      providers: [
        BookingsService,
        PrismaService,
        BookingsRepository,
        UsersRepository,
        PaymentRepository,
        GuidesRepository,
      ],
    }).compile();

    service = module.get<IBookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
