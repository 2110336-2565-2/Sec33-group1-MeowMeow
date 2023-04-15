export class FailedRelationConstraintError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, FailedRelationConstraintError.prototype);
  }
}

export class InvalidReportFormat extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, InvalidReportFormat.prototype);
  }
}
