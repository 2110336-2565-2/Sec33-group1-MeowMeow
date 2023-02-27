import { Inject } from '@nestjs/common';
import { UploadRequest, UploadResponse } from 'types';
import { DownloadRequest, DownloadResponse } from 'types';

export interface MediaStorage {
  read(path: string): Buffer;
  write(path: string, data: Buffer);
}

export interface MediaService {
  upload(req: DownloadRequest): UploadResponse;
  download(req: DownloadRequest): DownloadResponse;
}

export class MediaServiceImpl {
  constructor(
    @Inject('MediaStorage') private readonly mediaStorage: MediaStorage,
  ) {}

  async upload(req: UploadRequest): Promise<UploadResponse> {
    return null;
  }

  async download(req: DownloadRequest): Promise<DownloadResponse> {
    return null;
  }
}
