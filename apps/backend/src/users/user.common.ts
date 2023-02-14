export class UserNotFoundError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}

export class PropertyAlreadyUsedError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, PropertyAlreadyUsedError.prototype);
  }
}
