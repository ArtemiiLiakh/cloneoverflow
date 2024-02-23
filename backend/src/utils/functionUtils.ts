import { ValidationOptions } from 'class-validator'

export const validationMessage = (message: string, each?: boolean): ValidationOptions => {
  return {
    message,
    each,
  };
}