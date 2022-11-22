import { ControllerSuccess } from '../ControllerResponses/ControllerSuccess';
import { ApiResponse } from './ApiResponse';

export class ApiResponseSuccess extends ApiResponse {
  constructor(result: ControllerSuccess) {
    super();
    this.result = result.getResult();
  }

  getStatusCode() {
    return 200;
  }
}
