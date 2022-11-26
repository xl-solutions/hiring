export abstract class BaseError {
  private description = 'Error';
  constructor(private type: string) {}

  protected setDescription(description: string) {
    this.description = description;
  }

  protected abstract createDescriptionString(parameter: any): string;

  abstract getStatusCode(): number;
}
