import { Exception } from '@exceptions/Exception';
import { ExceptionMessage } from '@exceptions/ExceptionMessage';

export const exampleExceptionMessage = (
  path: string,
  exception: Exception
): ExceptionMessage => {
  const { status, message, } = exception.serializeError();

  return {
    path,
    error: exception.constructor.name,
    message,
    status,
    timestamp: new Date(0).toISOString(),
  };
};