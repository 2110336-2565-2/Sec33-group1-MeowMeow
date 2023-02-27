import { Module } from '@nestjs/common';

import { LocalMediaStorage } from 'media-storage';
import { MediaController } from './media.controller';
import { MediaServiceImpl } from './media.service';

@Module({
  controllers: [MediaController],
  providers: [
    {
      provide: 'MediaService',
      useClass: MediaServiceImpl,
    },
    LocalMediaStorage,
  ],
})
export class MediaModule {}
