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
import { AccountMetadata } from 'types';
import { AuthGuard } from 'src/auth/auth.guard';
import { MediaService } from './media.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('media')
export class MediaController {
  constructor(
    @Inject('MediaService') private readonly mediaService: MediaService,
  ) {}

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
