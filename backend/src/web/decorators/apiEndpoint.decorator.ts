import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EndpointDocumentationPayload } from './apiEndpoint/EndpointDocumentationPayload';
import { setAuthExceptions } from './apiEndpoint/setAuthExceptions';
import { setCodeValidation } from './apiEndpoint/setCodeValidation';
import { setDataValidation } from './apiEndpoint/setDataValidation';
import { setUserRatingValidation } from './apiEndpoint/setUserRatingValidation';
import { ApiExceptionPayload, ApiExceptions } from './apiException.decorator';

export const ApiEndpointDocumentation = (payload: EndpointDocumentationPayload): MethodDecorator => {
  if (!payload.exceptions) {
    payload.exceptions = [];
  } else if (!Array.isArray(payload.exceptions)) {
    payload.exceptions = [payload.exceptions];
  }
  
  const exceptionsMap = new Map<number, ApiExceptionPayload[]>();

  if (payload.useDataValidation) setDataValidation(payload);
  if (payload.useAuthValidation) setAuthExceptions(payload);
  if (payload.useRatingValidation) setUserRatingValidation(payload);
  if (payload.useCodeValidation) setCodeValidation(payload);
  
  for (const exception of payload.exceptions) {
    if (!exceptionsMap.has(exception.exception.statusCode)) {
      exceptionsMap.set(exception.exception.statusCode, [exception]);
    } else {
      exceptionsMap.get(
        exception.exception.statusCode,
      )?.push(exception);
    }
  }

  const exceptionDecorators: MethodDecorator[] = [];

  for (const [status, exceptions] of exceptionsMap.entries()) {
    exceptionDecorators.push(ApiExceptions(payload.path, status, ...exceptions));
  }

  return applyDecorators(
    ApiOperation({
      summary: payload.summary,
      operationId: payload.operationId,
    }),
    ApiResponse({
      status: payload.response.statusCode,
      type: payload.response.type,
      description: payload.response.description,
    }),
    ...exceptionDecorators,
  );
};