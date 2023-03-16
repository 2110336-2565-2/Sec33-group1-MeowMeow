import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  AccountMetadata,
  DownloadRequest,
  DownloadResponse,
  UploadRequest,
  UploadResponse,
} from 'types';
import { AuthGuard } from 'src/auth/auth.guard';
import { MediaService } from './media.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(
    @Inject('MediaService') private readonly mediaService: MediaService,
  ) {}

  @ApiCookieAuth('access_token')
  @ApiOperation({
    summary: 'upload a file',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadRequest,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully uploaded a file',
    type: UploadResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'valid session is not provided',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const resBody = await this.mediaService.upload({ file: file.buffer });
      res.status(HttpStatus.CREATED).send(resBody);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiCookieAuth('access_token')
  @ApiOperation({
    summary: 'decline booking by ID',
  })
  @ApiBody({
    type: DownloadRequest,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'successfully downloaded a file',
    type: DownloadResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'valid session is not provided',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'booking with given ID was not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'internal server error',
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  async download(@Param('id') id: string, @Res({ passthrough: true }) res) {
    try {
      const resBody = await this.mediaService.download({ id: id });
      res.status(HttpStatus.OK).send(resBody.file);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
