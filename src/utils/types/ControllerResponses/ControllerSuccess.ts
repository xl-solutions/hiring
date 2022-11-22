import { ControllerResult } from './ControllerResult';
import { EndpointsResponseTypes } from '../EndpointsTypes';

export class ControllerSuccess<EndpointsResponseTypes> implements ControllerResult {
  constructor(private result: EndpointsResponseTypes) {
    console.log(typeof result);
  }

  getResult() {
    return this.result;
  }
  getStatusCode() {
    return 200;
  }
}
