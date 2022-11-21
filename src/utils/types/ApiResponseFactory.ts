import { ApiError } from './ApiObjects/ApiError';
import { ApiSuccess } from './ApiObjects/ApiSuccess';

export class ApiResponse {
  result: ApiSuccess | null = null;
  errors: ApiError[] | null = null;
  constructor(response: ApiError[] | ApiSuccess) {
    //this IS really necessary, creating two classes to
    if ('length' in response) {
      this.createErrorResponse(response);
    } else {
      this.createSucessResponse(response);
    }
  }

  private createSucessResponse(result: ApiSuccess) {
    this.result = result;
  }

  private createErrorResponse(error: ApiError[]) {
    this.errors = error;
  }

  getStatusCode() {
    if (this.errors !== null) {
      return this.errors[0].getStatusCode();
    }
    return this.result?.getStatusCode();
  }
}
