import { readFile, writeFile, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { backendConfig } from "config";
import { StorageReadError, StorageWriteError } from "./commons";

export class LocalMediaStorage {
  private rootDir: string;

  constructor() {
    this.rootDir = backendConfig.mediaStorage.local.rootDir;
    this.ensureStorageDir();
  }

  async read(path: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      readFile(join(this.rootDir, path), function (err, data) {
        if (err) {
          reject(new StorageReadError(err.message));
        }
        resolve(data);
      });
    });
  }

  async write(path: string, data: Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
      writeFile(join(this.rootDir, path), data, { flag: "w+" }, function (err) {
        if (err) {
          reject(new StorageWriteError(err.message));
        }
        resolve();
      });
    });
  }

  private async ensureStorageDir(): Promise<void> {
    if (!existsSync(this.rootDir)) {
      mkdirSync(this.rootDir);
    }
  }
}
