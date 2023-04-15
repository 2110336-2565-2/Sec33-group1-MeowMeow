import { Injectable } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import {
  CreateReportQuery,
  CreateReportRequest,
  CreateReportResponse,
  SearchReportsRequest,
  SearchReportsResponse,
} from 'types';

@Injectable()
export class ReportsService {
  constructor(private readonly reportsRepo: ReportsRepository) {}

  async createReport(
    reporterId: number,
    reportData: CreateReportRequest,
    reportTarget: CreateReportQuery,
  ): Promise<CreateReportResponse> {
    try {
      const report = await this.reportsRepo.createReport(
        reporterId,
        reportData,
        reportTarget,
      );
      return {
        message: 'success',
        ...report,
      };
    } catch (e) {
      throw e;
    }
  }

  async searchReports(
    reportFilter: SearchReportsRequest,
  ): Promise<SearchReportsResponse> {
    try {
      const result = await this.reportsRepo.searchReports(reportFilter);
      return { reportsCount: result.length, reports: result };
    } catch (e) {
      throw e;
    }
  }
}
