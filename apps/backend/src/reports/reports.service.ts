import { Injectable } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import { CreateReportRequest, CreateReportResponse } from 'types';

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
        createdAt: report.createdAt,
        id: report.id,
        reporterId: report.reporterId,
        reportType: report.reportType,
        text: report.text,
      };
    } catch (e) {
      throw e;
    }
  }
}
