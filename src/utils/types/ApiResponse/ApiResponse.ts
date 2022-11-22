import { BaseError } from '../../errors/BaseError';
import { EndpointsResponseTypes } from '../EndpointsTypes';

export abstract class ApiResponse {
  result: EndpointsResponseTypes | null = null;
  errors: BaseError[] | null = null;
  constructor() {}

  getStatusCode() {}
}
