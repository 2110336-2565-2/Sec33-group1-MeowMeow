export class InvalidDateFormat extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, InvalidDateFormat.prototype);
  }
}

export class AccessNotGranted extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, AccessNotGranted.prototype);
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

export class UnprocessableEntity extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, UnprocessableEntity.prototype);
  }
}
