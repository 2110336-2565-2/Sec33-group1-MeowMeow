import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService, ReviewServiceImpl } from './review.service';

describe('ReviewService', () => {
  let service: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'ReviewService',
          useClass: ReviewServiceImpl,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
