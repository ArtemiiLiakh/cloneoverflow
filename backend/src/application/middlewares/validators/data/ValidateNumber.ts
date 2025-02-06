import { DataValidator } from '@application/interfaces/security/DataValidator';
import { isNumberString } from 'class-validator';

export const ValidateNumber: DataValidator<string> = {
  message: 'value must be a number',
  validate (value) {
    return isNumberString(value);
  },
};