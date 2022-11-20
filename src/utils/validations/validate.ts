import { isNotEmpty } from './isNotEmpty';

export class Validator {
  nameValidationMap: Map<string, Function>;
  errorMessageValidationMap?;

  constructor() {
    this.nameValidationMap = new Map();

    this.nameValidationMap.set('string', isNotEmpty);
    this.nameValidationMap.set('date', () => {});
  }
}

/**
 * That's faster than const obj = {}
 */
const nameValidationMap = new Map();

nameValidationMap.set('string', isNotEmpty);
nameValidationMap.set('date', () => {});

const errorMessageValidationMap = new Map();

errorMessageValidationMap.set('string', 'não é uma string valida');
errorMessageValidationMap.set('date', 'não é uma data valida');

export function validate(...values: ['string' | 'date', Record<string, any>][]) {
  return values.map(([validationType, validationObj]) => {
    const validationValueName = Object.keys(validationObj)[0];
    const validationValue = validationObj[validationValueName];
    return {
      validationType,
      validationValueName,
      validationValue,
      isValid: nameValidationMap.get(validationType)(validationValue),
    };
  });
}

function validationErrorStringFactory(valueName: string, value: any, validationType: string) {
  return `Parametro ${valueName} possui o valor invalido de '${value.toString()}'.`;
}

export function getValidationErrors(...values: ['string' | 'date', Record<string, any>][]) {
  return {
    errors: [
      ...validate(...values).map(({ isValid, validationType, validationValue, validationValueName }) => {
        if (!isValid)
          return {
            type: 'TypeError',
            description: validationErrorStringFactory(validationValueName, validationValue, validationType),
          };
      }),
    ],
  };
}
