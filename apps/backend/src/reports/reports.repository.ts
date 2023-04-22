import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateReportRequest,
  SearchReportsRequest,
  SearchReportsResponse,
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
      return await this.prismaService.report.create({
        data: {
          text: reportData.text,
          reporterId: reporterId,
          reportType: reportData.reportType,
          guideId: reportData.guideId,
          postId: reportData.postId,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new FailedRelationConstraintError('relation constraint failed');
        }
        throw e;
      }
    }
  }

  async searchReports(
    reportFilter: SearchReportsRequest,
  ): Promise<SearchReportsResponse> {
    try {
      const reportsCount = await this.prismaService.report.count({
        where: { reportType: { in: reportFilter.reportTypeFilter } },
      });
      const result = await this.prismaService.report.findMany({
        skip: reportFilter.offset,
        take: reportFilter.limit,
        where: {
          reportType: { in: reportFilter.reportTypeFilter },
        },
      });
      return { reportsCount: reportsCount, reports: result };
    } catch (e) {
      throw e;
    }
  }
}
