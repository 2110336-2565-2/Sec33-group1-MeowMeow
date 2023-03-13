export class RecordNotFound extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, RecordNotFound.prototype);
  }
}
