import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GuidesController } from './guide.controller';
import { GuideServiceImpl, GuideService } from './guide.service';

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
