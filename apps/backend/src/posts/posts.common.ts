export class FailedRelationConstraintError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, FailedRelationConstraintError.prototype);
  }
}

export class NotFoundError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
