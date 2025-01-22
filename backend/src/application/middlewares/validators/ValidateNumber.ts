import { FieldValidator } from '@application/interfaces/security/FieldValidator';
import { isNumberString } from 'class-validator';

export const ValidateNumber: FieldValidator<string> = {
  message: 'value must be a number',
  validate (value) {
    return isNumberString(value);
  },
};