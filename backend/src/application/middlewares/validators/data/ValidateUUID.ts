import { DataValidator } from '@application/interfaces/security/DataValidator';
import { isUUID } from 'class-validator';

export const ValidateUUID: DataValidator<string> = {
  message: 'value must be in UUID format',
  validate (value: string) {
    return isUUID(value); 
  },
};