import { ControllerResult } from './ControllerResult';

export enum ErrorTypes {
  NOT_FOUND = 'NotFoundError',
  UNKNOWN = 'UnknownError',
  VALIDATION = 'ValidationError',
}

const typeStatusNumberMap = new Map();

typeStatusNumberMap.set('NotFoundError', 404);
typeStatusNumberMap.set('UnknownError', 500);
typeStatusNumberMap.set('ValidationError', 400);

export class ControllerError implements ControllerResult {
  constructor(private type: ErrorTypes, private description: string) {}

  getStatusCode() {
    return typeStatusNumberMap.get(this.type);
  }
}
