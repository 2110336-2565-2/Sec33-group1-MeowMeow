import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { PostsController } from './posts.controller';
import { PostsServiceImpl } from './posts.service';
import { PostsRepository } from './posts.repository';
import { GuidesModule } from '../guides/guides.module';
import { GuidesRepository } from '../guides/guides.repository';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, GuidesModule],
      controllers: [PostsController],
      providers: [
        {
          provide: 'PostsService',
          useClass: PostsServiceImpl,
        },
        PostsRepository,
        PrismaService,
        GuidesRepository,
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
