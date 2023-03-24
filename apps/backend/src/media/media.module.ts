import { Module } from '@nestjs/common';

import { LocalMediaStorage } from 'media-storage';
import { MediaController } from './media.controller';
import { MediaServiceImpl } from './media.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [MediaController],
  providers: [
    {
      provide: 'MediaService',
      useClass: MediaServiceImpl,
    },
    {
      provide: 'MediaStorage',
      useClass: LocalMediaStorage,
    },
  ],
  exports: ['MediaService'],
})
export class MediaModule {}
