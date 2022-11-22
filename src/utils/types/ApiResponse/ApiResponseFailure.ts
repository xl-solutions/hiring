import { BaseError } from '../../errors/BaseError';
import { ApiResponse } from './ApiResponse';

export class ApiResponseFailure extends ApiResponse {
  constructor(errors: BaseError[]) {
    super();
    this.errors = errors;
  }

  getStatusCode() {
    //cant be null, typescript is drunk.
    return this.errors![0].getStatusCode();
  }
}
