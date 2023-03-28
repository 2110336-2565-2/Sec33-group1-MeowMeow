import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  AccountMetadata,
  GetGuideByIdResponse,
  GuideRegisterRequest,
  SearchGuidesGuideResponse,
  SearchGuidesRequest,
} from 'types';
import { GuidesService } from './guides.service';
import {
  ApiConsumes,
  ApiCookieAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReviewsService } from '../reviews/reviews.service';
import { FileIsDefinedValidator } from '../common/file.validator';
import { PropertyAlreadyUsedError, RecordAlreadyExist } from './guides.common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';
import { InvalidRequestError } from '../auth/auth.commons';

@ApiTags('Guides')
@Controller('guides')
export class GuidesController {
  constructor(
    @Inject('GuidesService') private readonly guidesService: GuidesService,
    @Inject('ReviewsService') private readonly reviewsService: ReviewsService,
  ) {}

  handleException(e: Error) {
    console.log(e);
    if (e instanceof InvalidRequestError)
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    if (e instanceof NotFoundException)
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    if (e instanceof PropertyAlreadyUsedError)
      throw new HttpException(e.message, HttpStatus.CONFLICT);
    throw new HttpException(
      'internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @ApiOperation({ summary: 'paginate guides with filter' })
  @ApiQuery({ name: 'offset', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully paginated guides',
    type: [SearchGuidesGuideResponse],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'access token not provided',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid request',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async searchGuides(@Query() queryParams: SearchGuidesRequest) {
    try {
      return await this.guidesService.searchGuides(queryParams);
    } catch (e) {
      this.handleException(e);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get guide by id',
    type: GetGuideByIdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid request',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getGuideById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetGuideByIdResponse> {
    try {
      const guild = await this.guidesService.getGuideById(id);
      if (!guild) {
        throw new NotFoundException(`Guide with id ${id} does not exist.`);
      }
      return guild;
    } catch (e) {
      this.handleException(e);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get guide reviews',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'validation error',
  })
  @Get(':id/reviews/:page')
  @HttpCode(HttpStatus.OK)
  async getGuideReviews(
    @Param('id', ParseIntPipe) id: number,
    @Param('page', ParseIntPipe) page: number,
  ) {
    try {
      return await this.reviewsService.getGuideReviews(id, page);
    } catch (e) {
      this.handleException(e);
    }
  }

  @ApiCookieAuth('access_token')
  @ApiOperation({ summary: 'register for a guide' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully registered for a guide',
    type: [SearchGuidesGuideResponse],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'access token not provided',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'user has already been a guide',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
<<<<<<< HEAD
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  @UseInterceptors(FileInterceptor('certificate'))
=======
  @UseInterceptors(
    FileInterceptor('certificate', { limits: { fieldSize: 1000000000 } }),
  )
>>>>>>> 7645b68... chore: expand cert file size to 1GB
  @UseGuards(AuthGuard)
  @Post('register')
  async registerForGuide(
    @Req() req,
    @UploadedFile(
      new ParseFilePipe({ validators: [new FileIsDefinedValidator()] }),
    )
    certificate: Express.Multer.File,
    @Body() guideRegisterData: GuideRegisterRequest,
  ) {
    try {
      const account: AccountMetadata = req.account;
      return await this.guidesService.registerUserForGuide(account.userId, {
        ...guideRegisterData,
        certificate: certificate.buffer,
      });
    } catch (e) {
      if (e instanceof RecordAlreadyExist) {
        throw new HttpException(
          'user has already been a guide',
          HttpStatus.CONFLICT,
        );
      }
      this.handleException(e);
    }
  }
}
