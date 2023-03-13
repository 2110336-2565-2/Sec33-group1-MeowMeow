import { Inject, Injectable } from '@nestjs/common';
import { join } from 'path';
import * as crypto from 'crypto';
import { UploadRequest, UploadResponse } from 'types';
import { DownloadRequest, DownloadResponse } from 'types';

export interface MediaStorage {
  read(path: string): Promise<Buffer>;
  write(path: string, data: Buffer): Promise<void>;
}

export interface MediaService {
  upload(req: UploadRequest): Promise<UploadResponse>;
  download(req: DownloadRequest): Promise<DownloadResponse>;
}

@Injectable()
export class MediaServiceImpl {
  private pathPrefix: string;
  constructor(
    @Inject('MediaStorage') private readonly mediaStorage: MediaStorage,
  ) {}

  async upload(req: UploadRequest): Promise<UploadResponse> {
    const fileId = crypto.randomUUID();
    const path = fileId;
    await this.mediaStorage.write(path, req.file);
    return {
      message: 'success',
      id: fileId,
    };
  }

  async download(req: DownloadRequest): Promise<DownloadResponse> {
    const path = req.id;
    ``;
    const file = await this.mediaStorage.read(path);
    return {
      message: 'success',
      file: file,
    };
  }
}
