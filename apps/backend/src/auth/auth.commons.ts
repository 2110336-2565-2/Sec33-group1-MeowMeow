export class InvalidRequestError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, InvalidRequestError.prototype);
  }
}

export class InvalidAuthenticationError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, InvalidAuthenticationError.prototype);
  }
}

export class MissingPermissionError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, MissingPermissionError.prototype);
  }
}
