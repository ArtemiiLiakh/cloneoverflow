import { FieldValidator } from '@application/interfaces/security/FieldValidator';
import { isUUID } from 'class-validator';

export const ValidateUUID: FieldValidator<string> = {
  message: 'value must be in UUID format',
  validate (value: string) {
    return isUUID(value); 
  },
};