import { Inject } from '@nestjs/common';
import { join } from 'path';
import { UploadRequest, UploadResponse } from 'types';
import { DownloadRequest, DownloadResponse } from 'types';

export interface MediaStorage {
  read(path: string): Promise<Buffer>;
  write(path: string, data: Buffer): Promise<void>;
}

export interface MediaService {
  upload(req: DownloadRequest): Promise<UploadResponse>;
  download(req: DownloadRequest): Promise<DownloadResponse>;
}

export class MediaServiceImpl {
  private pathPrefix: string;
  constructor(
    @Inject('MediaStorage') private readonly mediaStorage: MediaStorage,
  ) {
    this.pathPrefix = 'file';
  }

  async upload(req: UploadRequest): Promise<UploadResponse> {
    const fileId = crypto.randomUUID();
    const path = join(this.pathPrefix, fileId);
    await this.mediaStorage.write(path, req.file);
    return {
      message: 'success',
      id: fileId,
    };
  }

  async download(req: DownloadRequest): Promise<DownloadResponse> {
    const path = join(this.pathPrefix, req.id);
    const file = await this.mediaStorage.read(path);
    return {
      message: 'success',
      file: file,
    };
  }
}
