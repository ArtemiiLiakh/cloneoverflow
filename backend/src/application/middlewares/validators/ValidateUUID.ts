import { isUUID } from 'class-validator';
import { FieldValidator } from '../../interfaces/security/FieldValidator';

export const ValidateUUID: FieldValidator = {
  message: 'value must be in UUID format',
  validate (value: string) {
    return isUUID(value); 
  },
};