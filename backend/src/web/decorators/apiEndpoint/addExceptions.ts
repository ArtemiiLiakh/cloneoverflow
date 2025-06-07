import { ApiExceptionPayload } from '../apiException.decorator';
import { EndpointDocumentationPayload } from './EndpointDocumentationPayload';

export const addExceptionsToPayload = (
  payload: EndpointDocumentationPayload, 
  exceptions: ApiExceptionPayload[],
): void => {
  if (!payload.exceptions) return;

  for (const { title, exception } of exceptions) {
    if (!payload.exceptions) {
      payload.exceptions = [{
        title,
        exception,
      }];
    }
    else if (Array.isArray(payload.exceptions)) {
      payload.exceptions.push({
        title, 
        exception,
      });
    }
    else {
      payload.exceptions = [payload.exceptions];
    }
  }
};