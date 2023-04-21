import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { BookingsController } from './bookings.controller';
import { BookingsRepository } from './bookings.repository';
import { BookingsService } from './bookings.service';
import { PostsModule } from '../posts/posts.module';
import { PostsServiceImpl } from '../posts/posts.service';
import { PaymentModule } from '../payment/payment.module';
import { PaymentService } from '../payment/payment.service';
import { GuidesModule } from '../guides/guides.module';
import { PostsRepository } from '../posts/posts.repository';
import { HttpModule, HttpService } from '@nestjs/axios';
import { UsersRepository } from '../users/users.repository';
import { PaymentRepository } from '../payment/payment.repository';
import { GuidesRepository } from '../guides/guides.repository';

describe('BookingsController', () => {
  let controller: BookingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        PostsModule,
        GuidesModule,
        HttpModule,
        PaymentModule,
      ],
      controllers: [BookingsController],
      providers: [
        {
          provide: 'IBookingsService',
          useClass: BookingsService,
        },
        BookingsRepository,
        PrismaService,
        {
          provide: 'PostsService',
          useClass: PostsServiceImpl,
        },
        PaymentService,
        PostsRepository,
        UsersRepository,
        PaymentRepository,
        GuidesRepository,
      ],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
