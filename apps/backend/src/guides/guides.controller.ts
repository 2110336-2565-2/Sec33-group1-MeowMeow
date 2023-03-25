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
  GetGuideByIdRequest,
  GetGuideByIdResponse,
  GetGuideReviewsRequest,
  GuideRegisterRequest,
  SearchGuidesRequest,
  SearchGuidesResponse,
} from 'types';
import { GuidesService } from './guides.service';
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReviewsService } from '../reviews/reviews.service';
import { FileIsDefinedValidator } from '../common/file.validator';
import { RecordAlreadyExist } from './guides.common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';
import { InvalidRequestError } from '../auth/auth.commons';
import { validate } from 'class-validator';

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
    throw new HttpException(
      'internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @ApiCookieAuth('access_token')
  @ApiOperation({ summary: 'paginate guides with filter' })
  @ApiQuery({ name: 'offset', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
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
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async getGuideById(
    @Param() queryParams: GetGuideByIdRequest,
  ): Promise<GetGuideByIdResponse> {
    try {
      const guild = await this.guidesService.getGuideById(queryParams);
      if (!guild) {
        throw new NotFoundException(
          `Guide with id ${queryParams.id} does not exist.`,
        );
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
    description: 'invalid request',
  })
  @Get(':id/reviews/:page')
  @HttpCode(HttpStatus.OK)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async getGuideReviews(@Param() queryParams: GetGuideReviewsRequest) {
    try {
      const err = await validate(queryParams);
      if (err.length > 0) {
        throw new InvalidRequestError(err.toString());
      }

      return await this.reviewsService.getGuideReviews(
        queryParams.id,
        queryParams.page,
      );
    } catch (e) {
      this.handleException(e);
    }
  }

  @ApiCookieAuth('access_token')
  @ApiOperation({ summary: 'register for a guide' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        certificate: {
          description: 'certificate file in JPEG/PNG format',
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully registered for a guide',
    type: SearchGuidesResponse,
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
  @UseInterceptors(FileInterceptor('certificate'))
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
        certificate,
        ...guideRegisterData,
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
