export class InvalidDateFormat extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, InvalidDateFormat);
  }
}

export class RecordNotFound extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, RecordNotFound.prototype);
  }
}

export class RecordAlreadyExist extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, RecordAlreadyExist.prototype);
  }
}

export class FailedRelationConstraintError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, FailedRelationConstraintError.prototype);
  }
}
