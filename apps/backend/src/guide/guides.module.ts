import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GuidesController } from './guides.controller';
import { GuideServiceImpl, GuideService } from './guides.service';

@Module({
  controllers: [GuidesController],
  providers: [
    {
      provide: 'GuideService',
      useClass: GuideServiceImpl,
    },
    PrismaService,
  ],
})
export class GuidesModule {}
