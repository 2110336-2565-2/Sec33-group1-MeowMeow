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
  CreateReportRequest,
  CreateReportResponse,
  GetGuideByIdResponse,
  SearchReportsRequest,
  SearchReportsResponse,
} from 'types';
import { AuthGuard } from 'src/auth/auth.guard';
import { FailedRelationConstraintError } from './reports.common';
import { Role } from 'database';

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
  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiCookieAuth('access-token')
  @UseGuards(AuthGuard)
  async createReport(
    @Req() req,
    @Body() reportData: CreateReportRequest,
  ): Promise<CreateReportResponse> {
    try {
      const account: AccountMetadata = req.account;
      return await this.reportsService.createReport(account.userId, reportData);
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
