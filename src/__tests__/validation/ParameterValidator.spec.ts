import { ValidationError } from '../../utils/errors/ValidationError';
import { ParameterValidator } from '../../utils/validations/ParameterValidator';
import { ValidatationTypes } from '../../utils/validations/Validators';

describe('tests', () => {
  test('getValidationErrors - should return undefined when theres no error', () => {
    const number = '2';
    const result = ParameterValidator.getValidationErrors([ValidatationTypes.NUMBER, { number }]);
    expect(result).toBe(undefined);
  });

  test('getValidationErrors - should correct inplement parameter alias', () => {
    const wrongNumber = 'NaN';
    const resultWErrors = ParameterValidator.getValidationErrors([ValidatationTypes.NUMBER, { alias: wrongNumber }]);
    expect(resultWErrors).toMatchObject([new ValidationError('alias', wrongNumber, ValidatationTypes.NUMBER)]);
  });

  test('getValidationErrors - should return an error array containing all errors if theres a error', () => {
    const wrongNumber = 'NaN';
    const resultWErrors = ParameterValidator.getValidationErrors([ValidatationTypes.NUMBER, { wrongNumber }]);
    expect(resultWErrors).toMatchObject([new ValidationError('wrongNumber', wrongNumber, ValidatationTypes.NUMBER)]);
  });
});
