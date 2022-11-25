import { ControllerResult } from './ControllerResult';

export class ControllerSuccess<EndpointsResponseTypes> implements ControllerResult {
  constructor(private result: EndpointsResponseTypes) {}

  getResult() {
    return this.result;
  }
  getStatusCode() {
    return 200;
  }
}
