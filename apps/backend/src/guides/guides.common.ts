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
