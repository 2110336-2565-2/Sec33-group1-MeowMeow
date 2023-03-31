export class GuideNotFound extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, GuideNotFound);
  }
}

export class FailedRelationConstraintError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, FailedRelationConstraintError.prototype);
  }
}

export class RecordAlreadyExist extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, RecordAlreadyExist.prototype);
  }
}

export class PropertyAlreadyUsedError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, PropertyAlreadyUsedError.prototype);
  }
}
