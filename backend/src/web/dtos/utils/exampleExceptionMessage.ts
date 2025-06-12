import { Exception, ExceptionMessage } from '@cloneoverflow/common';

export const exampleExceptionMessage = (
  path: string,
  exception: Exception,
): ExceptionMessage => {
  const message = exception.serializeError();

  return {
    path,
    error: exception.constructor.name,
    message,
    status: exception.statusCode,
    timestamp: new Date(0).toISOString(),
  };
};