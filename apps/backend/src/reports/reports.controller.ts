import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import {
  AccountMetadata,
  CreateReportQuery,
  CreateReportRequest,
  CreateReportResponse,
  SearchReportsRequest,
  SearchReportsResponse,
} from 'types';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  FailedRelationConstraintError,
  InvalidReportFormat,
} from './reports.common';
import { ReportType, Role } from 'database';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(
    @Inject('ReportsService') private readonly reportsService: ReportsService,
  ) {}

  handleException(e: Error) {
    if (e instanceof FailedRelationConstraintError)
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    if (e instanceof UnauthorizedException)
      throw new UnauthorizedException(e.message);
    if (e instanceof InvalidReportFormat)
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ApiOperation({
    summary: 'Report guide, trip, system, or other type of complaint to admin',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully send a report',
    type: CreateReportResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Some parameters were not passed correctly',
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiCookieAuth('access-token')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  @UseGuards(AuthGuard)
  async createReport(
    @Req() req,
    @Query() reportTarget: CreateReportQuery,
    @Body() reportData: CreateReportRequest,
  ): Promise<CreateReportResponse> {
    try {
      if (
        (reportData.reportType == ReportType.GUIDE && !reportTarget.guideId) ||
        (reportData.reportType == ReportType.TRIP && !reportTarget.postId)
      ) {
        throw new InvalidReportFormat(
          "Report type and reported id don't matched",
        );
      }
      const account: AccountMetadata = req.account;
      if (!(reportData.reportType == ReportType.GUIDE)) {
        reportTarget.guideId = null;
      }
      if (!(reportData.reportType == ReportType.TRIP)) {
        reportTarget.postId = null;
      }
      return await this.reportsService.createReport(
        account.userId,
        reportData,
        reportTarget,
      );
    } catch (e) {
      this.handleException(e);
    }
  }

  @ApiOperation({
    summary: 'Get all reports',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully get all reports',
    type: SearchReportsResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'access denied',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiCookieAuth('access-token')
  @UseGuards(AuthGuard)
  async searchPost(
    @Req() req,
    @Query() searchFilter: SearchReportsRequest,
  ): Promise<SearchReportsResponse> {
    try {
      const account: AccountMetadata = req.account;
      if (!req.account.roles.includes(Role.ADMIN)) {
        throw new UnauthorizedException('Only ADMIN can access this function');
      }
      return await this.reportsService.searchReports(searchFilter);
    } catch (e) {
      this.handleException(e);
    }
  }
}
