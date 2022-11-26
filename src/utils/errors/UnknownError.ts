import { BaseError } from './BaseError';

export class UnknownError extends BaseError {
  constructor() {
    super('UnknownError');

    this.setDescription(this.createDescriptionString(undefined));
  }

  protected createDescriptionString(_: undefined): string {
    return `Unknown error.`;
  }
  getStatusCode(): number {
    return 500;
  }
}
