export class ControllerSuccess<EndpointsResponseTypes> {
  constructor(private result: EndpointsResponseTypes) {}

  getResult() {
    return this.result;
  }
  getStatusCode() {
    return 200;
  }
}
