import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportsRepository } from './reports.repository';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ReportsController],
  providers: [
    {
      provide: 'ReportsService',
      useClass: ReportsService,
    },
    ReportsRepository,
    PrismaService,
  ],
})
export class ReportsModule {}
