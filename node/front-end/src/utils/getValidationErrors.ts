import { ValidationError } from 'yup';

interface Erros {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Erros {
  const validationErrors: Erros = {};

  err.inner.forEach((error: ValidationError) => {
    if (error.path) validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
