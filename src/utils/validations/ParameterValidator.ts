import { ValidationError } from '../errors/ValidationError';
// import { ControllerError, ErrorTypes } from '../types/ControllerResponses/ControllerError';
import { Validators } from './Validators';
import { ValidatationTypes } from './Validators';

type MultipleValidationInput = [ValidatationTypes, Record<string, any>][];

export class ParameterValidator {
  private static nameValidationMap: Record<string, Function> = {
    string: Validators.isNotEmpty,
    date: () => {},
  };

  private static validate(validationKey: string, value: any) {
    return this.nameValidationMap[validationKey](value);
  }

  /**
   * This function calls the validates an array[n] using the function pointed by the string key.
   * @param values An array containing the type of validation, and a object
   *  containing name and value of the parameter that needs to be validated.
   */
  private static validateValues(...values: MultipleValidationInput) {
    return values.map(([validationType, validationObj]) => {
      const name = Object.keys(validationObj)[0];
      const value = validationObj[name];

      return {
        name,
        value,
        validationType,
        isValid: this.validate(validationType, value),
      };
    });
  }

  /**
   * Return validationErrors as an Errors array or undefined if there's none.
   */
  static getValidationErrors(...values: MultipleValidationInput) {
    const errors: ValidationError[] = [];
    this.validateValues(...values).forEach(({ isValid, validationType, name, value }) => {
      if (!isValid) {
        errors.push(new ValidationError(name, value, validationType));
      }
    });
    if (errors.length > 0) return errors;
    return undefined;
  }
}
