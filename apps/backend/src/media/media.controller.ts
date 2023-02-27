import {
  Controller,
  Get,
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
  async download(
    @Param('id') id: string,
    @Req() req,
    @Res({ passthrough: true }) res,
  ) {
    const account: AccountMetadata = req.account;
    console.log(account);
  }
}
