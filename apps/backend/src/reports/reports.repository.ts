import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateReportRequest,
  CreateReportResponse,
  SearchReportsRequest,
} from 'types';
import { Prisma, Report } from 'database';
import { FailedRelationConstraintError } from './reports.common';

@Injectable()
export class ReportsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createReport(
    reporterId: number,
    reportData: CreateReportRequest,
  ): Promise<Report> {
    try {
      const createdReport = await this.prismaService.report.create({
        data: {
          text: reportData.text,
          reporterId: reporterId,
          reportType: reportData.reportType,
        },
      });
      return createdReport;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new FailedRelationConstraintError('relation constraint failed');
        }
        throw e;
      }
    }
  }

  async searchReports(reportFilter: SearchReportsRequest): Promise<Report[]> {
    try {
      return await this.prismaService.report.findMany({
        skip: reportFilter.offset,
        take: reportFilter.limit,
        where: {
          reportType: { in: reportFilter.reportTypeFilter },
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
