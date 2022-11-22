import { ControllerResult } from './ControllerResult';
import { EndpointsResponseTypes } from '../EndpointsTypes';

export class ControllerSuccess implements ControllerResult {
  constructor(private result: EndpointsResponseTypes) {}

  getResult() {
    return this.result;
  }
  getStatusCode() {
    return 200;
  }
}
