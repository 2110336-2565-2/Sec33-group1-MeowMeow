import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GuidesController } from './guides.controller';
import { GuidesService } from './service/guides/guides.service';

@Module({
  controllers: [GuidesController],
  providers: [GuidesService, PrismaService],
})
export class GuidesModule {}
