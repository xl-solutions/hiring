import { ControllerSuccess } from '../ControllerResponses/ControllerSuccess';
import { EndpointsResponseTypes } from '../EndpointsTypes';
import { ApiResponse } from './ApiResponse';

export class ApiResponseSuccess extends ApiResponse {
  constructor(result: ControllerSuccess<EndpointsResponseTypes>) {
    super();
    this.result = result.getResult();
  }

  getStatusCode() {
    return 200;
  }
}
