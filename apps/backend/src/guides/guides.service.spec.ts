import { Test, TestingModule } from '@nestjs/testing';
import { GuideService, GuideServiceImpl } from './guides.service';

describe('GuidesService', () => {
  let service: GuideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'GuideService',
          useClass: GuideServiceImpl,
        },
      ],
    }).compile();

    service = module.get<GuideService>(GuideServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
