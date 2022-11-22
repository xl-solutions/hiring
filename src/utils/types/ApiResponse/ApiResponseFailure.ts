import { ControllerError } from '../ControllerResponses/ControllerError';
import { ApiResponse } from './ApiResponse';

export class ApiResponseFailure extends ApiResponse {
  constructor(errors: ControllerError[]) {
    super();
    this.errors = errors;
  }

  getStatusCode() {
    //cant be null, typescript is drunk.
    return this.errors![0].getStatusCode();
  }
}
