import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import {
  AccountMetadata,
  CreateReportRequest,
  GetGuideByIdResponse,
} from 'types';
import { AuthGuard } from 'src/auth/auth.guard';
import { FailedRelationConstraintError } from './reports.common';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(
    @Inject('ReportsService') private readonly reportsService: ReportsService,
  ) {}

  handleException(e: Error) {
    if (e instanceof FailedRelationConstraintError)
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    throw new HttpException(
      'internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @ApiOperation({
    summary: 'Report guide, trip, system, or other type of complaint to admin',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully send a report',
    type: GetGuideByIdResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  @UseGuards(AuthGuard)
  async createReport(@Req() req, @Body() reportData: CreateReportRequest) {
    try {
      const account: AccountMetadata = req.account;
      return await this.reportsService.createReport(account.userId, reportData);
    } catch (e) {
      this.handleException(e);
    }
  }
}
