import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SearchGuidesRequest, SearchGuidesResponse } from './dtos/searchGuide';
import { GuidesService } from './guides.service';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('guides')
export class GuidesController {
  constructor(
    @Inject('GuidesService') private readonly guidesService: GuidesService,
  ) {}

  @ApiCookieAuth('access_token')
  @ApiOperation({
    summary: 'paginate guides with filter',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully paginated guides',
    type: SearchGuidesResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'access token not provided',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @Get()
  @UsePipes(new ValidationPipe())
  async searchGuides(
    @Body() reqBody: SearchGuidesRequest,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const resBody = await this.guidesService.searchGuides(reqBody);
      res.status(HttpStatus.OK).send(resBody);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
