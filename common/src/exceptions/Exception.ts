import { SerializedError } from '../types/SerializedError';

export class Exception extends Error {
  constructor (
    public message = 'Error',
    public statusCode = 500, 
  ) {
    super(message);
  }

  serializeError (): SerializedError {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}