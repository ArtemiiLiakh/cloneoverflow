import { ValidationException } from '@cloneoverflow/common';
import { ValidationError } from '@nestjs/common';

export const ValidationErrorFactory = (errors: ValidationError[]): ValidationException => {
  return new ValidationException(errors);
};