import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  constructor(parameter: Record<string, string>) {
    super('NotFoundError');

    const objectAlias = Object.keys(parameter)[0];
    const objectValue = parameter[objectAlias];
    this.setDescription(this.createDescriptionString({ objectAlias, objectValue }));
  }

  protected createDescriptionString({ objectAlias, objectValue }: any): string {
    return `Did not found any result for parameter ${objectAlias} with value '${objectValue}'.`;
  }
  getStatusCode(): number {
    return 404;
  }
}
