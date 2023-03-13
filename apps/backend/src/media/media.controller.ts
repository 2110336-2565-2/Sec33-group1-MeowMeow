import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AccountMetadata } from 'types';
import { AuthGuard } from 'src/auth/auth.guard';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(
    @Inject('MediaService') private readonly mediaService: MediaService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async download(@Param('id') id: string, @Res({ passthrough: true }) res) {
    try {
      const resBody = await this.mediaService.download({ id: id });
      res.status(HttpStatus.OK).send(resBody.file);
    } catch (e) {
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
