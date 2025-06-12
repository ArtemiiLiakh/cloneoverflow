import { ValidationOptions } from 'class-validator';

export const validationMessageEnum = (enumValue: object, field: string, options?: ValidationOptions): ValidationOptions => ({
  ...options,
  message: `${field} must have the following values: ${Object.values(enumValue).join(', ')}`,
});
