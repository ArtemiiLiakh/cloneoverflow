import { ValidationError } from 'class-validator';
import { EndpointDocumentationPayload } from './EndpointDocumentationPayload';
import { ValidationException } from '@cloneoverflow/common';
import { addExceptionsToPayload } from './addExceptions';

export const setDataValidation = (payload: EndpointDocumentationPayload): void => {
  if (!payload.exceptions) return;
  
  const validationError = new ValidationError();
  validationError.property = 'userId';
  validationError.constraints = {
    'format': 'userId must be in uuid format',
  };
  
  const validationException = new ValidationException([validationError], 'param');

  addExceptionsToPayload(payload, [{
    title: 'Data validation failed',
    exception: validationException,
  }]);
};
