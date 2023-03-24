import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  AccountMetadata,
  GetGuideByIdRequest,
  GetGuideReviewsRequest,
  SearchGuidesRequest,
  SearchGuidesResponse,
} from 'types';
import { GuidesService } from './guides.service';
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ReviewsService } from 'src/reviews/reviews.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileIsDefinedValidator } from 'src/common/file.validator';
import {
  FailedRelationConstraintError,
  RecordAlreadyExist,
} from './guides.common';

@ApiTags('guides')
@Controller('guides')
export class GuidesController {
  constructor(
    @Inject('GuidesService') private readonly guidesService: GuidesService,
    @Inject('ReviewsService') private readonly reviewsService: ReviewsService,
  ) {}

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
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @Get()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async searchGuides(
    @Query() queryParams: SearchGuidesRequest,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const resBody = await this.guidesService.searchGuides(queryParams);
      res.status(HttpStatus.OK).send(resBody);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async getGuideById(
    @Param() queryParams: GetGuideByIdRequest,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const resBody = await this.guidesService.getGuideById(queryParams);
      if (!resBody) {
        throw new NotFoundException(
          `Guide with id ${queryParams.id} does not exist.`,
        );
      }
      res.status(HttpStatus.OK).send(resBody);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @Get(':id/reviews/:page')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async getGuideReviews(
    @Param() queryParams: GetGuideReviewsRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const reviews = await this.reviewsService.getGuideReviews(queryParams);
      res.status(HttpStatus.OK).send(reviews);
    } catch (e) {
      console.log(e);
      throw e;
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
  @Post('registration/self')
  async registerForGuide(
    @Req() req,
    @UploadedFile(
      new ParseFilePipe({ validators: [new FileIsDefinedValidator()] }),
    )
    certificate: Express.Multer.File,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const account: AccountMetadata = req.account;
      const resBody = await this.guidesService.registerUserForGuide({
        userId: account.userId,
        certificate: certificate.buffer,
      });
      res.status(HttpStatus.CREATED).send(resBody);
    } catch (e) {
      console.log(e);
      if (e instanceof RecordAlreadyExist) {
        throw new HttpException(
          'user has already been a guide',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'internal server errror',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
