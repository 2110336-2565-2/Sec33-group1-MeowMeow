<<<<<<< HEAD
=======
import { Stream } from "stream";

>>>>>>> 43bfa67... feat: add scaffolding for media module
export class DownloadRequest {
  id: string;
}

export class DownloadResponse {
  message: string;
<<<<<<< HEAD
  file: Buffer;
=======
  file: Stream;
>>>>>>> 43bfa67... feat: add scaffolding for media module
}
