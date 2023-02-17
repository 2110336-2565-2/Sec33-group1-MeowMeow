import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GuidesController } from './guide.controller';
import { GuideServiceImpl, GuideService } from './guide.service';
import { GuideRepository } from './guide.repository';

@Module({
  controllers: [GuidesController],
  providers: [
    {
      provide: 'GuideService',
      useClass: GuideServiceImpl,
    },
    GuideRepository,
    PrismaService,
  ],
})
export class GuidesModule {}
