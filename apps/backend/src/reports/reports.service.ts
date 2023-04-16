import { Injectable } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import {
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
  ): Promise<CreateReportResponse> {
    try {
      const report = await this.reportsRepo.createReport(
        reporterId,
        reportData,
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
      return await this.reportsRepo.searchReports(reportFilter);
    } catch (e) {
      throw e;
    }
  }
}
