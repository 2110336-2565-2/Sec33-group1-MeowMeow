export class DownloadRequest {
  id: string;
}

export class DownloadResponse {
  message: string;
  file: Buffer;
}
