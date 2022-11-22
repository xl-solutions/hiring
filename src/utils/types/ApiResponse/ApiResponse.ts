import { ControllerError } from '../ControllerResponses/ControllerError';
import { EndpointsResponseTypes } from '../EndpointsTypes';

export abstract class ApiResponse {
  result: EndpointsResponseTypes | null = null;
  errors: ControllerError[] | null = null;
  constructor() {}

  getStatusCode() {}
}
