import { Stream } from "stream";

export class DownloadRequest {
  id: string;
}

export class DownloadResponse {
  message: string;
  file: Stream;
}
