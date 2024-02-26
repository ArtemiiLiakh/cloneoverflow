import { SerializedError } from '../../types/SerializedError';

export abstract class Exception extends Error {
  abstract message: any;
  abstract statusCode: number;

  serializeError (): SerializedError {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}