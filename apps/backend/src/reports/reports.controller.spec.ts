import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { AuthModule } from '../auth/auth.module';
import { PostsModule } from '../posts/posts.module';
import { ReportsService } from './reports.service';
import { ReportsRepository } from './reports.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('ReportsController', () => {
  let controller: ReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, PostsModule],
      controllers: [ReportsController],
      providers: [
        {
          provide: 'ReportsService',
          useClass: ReportsService,
        },
        ReportsRepository,
        PrismaService,
      ],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
