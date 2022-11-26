import { ValidatationTypes } from '../validations/Validators';
import { BaseError } from './BaseError';

export class ValidationError extends BaseError {
  constructor(name: string, value: string, validationType: ValidatationTypes) {
    super('ValidationError');

    this.setDescription(this.createDescriptionString({ name, value, validationType }));
  }

  protected createDescriptionString({ name, value, validationType }: any) {
    return `${validationType}: Parameter of name '${name}' has the invalid value of '${value.toString()}'.`;
  }
  getStatusCode(): number {
    return 400;
  }
}
