export class StorageReadError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, StorageReadError.prototype);
  }
}

export class StorageWriteError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, StorageWriteError.prototype);
  }
}
