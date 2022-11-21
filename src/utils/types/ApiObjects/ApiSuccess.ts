import { ControllerResult } from './ControllerResult';
import { EndpointsResponseTypes } from '../EndpointsTypes';

export class ApiSuccess implements ControllerResult {
  constructor(private result: EndpointsResponseTypes) {}

  getApiResponseObject() {
    return this.result;
  }

  getStatusCode() {
    return 200;
  }
}
