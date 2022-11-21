import { ApiError, ErrorTypes } from '../types/ApiObjects/ApiError';
import { isNotEmpty } from './isNotEmpty';
import { ValidatationTypes } from './validationTypes';

type MultipleValidationInput = [ValidatationTypes, Record<string, any>][];

export class ParameterValidator {
  private static nameValidationMap: Record<string, Function> = {
    string: isNotEmpty,
    date: () => {},
  };

  private static errorMessageValidationMap = {
    string: 'não é uma string valida',
    date: 'não é uma data valida',
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
   * Constructs an error message string
   */
  private static validationErrorString(valueName: string, value: any, validationType: ValidatationTypes) {
    return `Parametro ${valueName} possui o valor invalido de '${value.toString()}'.`;
  }

  /**
   * Return validationErrors as an Errors or undefined if there's none.
   */
  static getValidationErrors(...values: MultipleValidationInput) {
    const errors: ApiError[] = [];
    this.validateValues(...values).forEach(({ isValid, validationType, name, value }) => {
      if (!isValid) {
        errors.push(new ApiError(ErrorTypes.VALIDATION, this.validationErrorString(name, value, validationType)));
      }
    });
    if (errors.length > 0) return errors;
    return undefined;
  }
}
