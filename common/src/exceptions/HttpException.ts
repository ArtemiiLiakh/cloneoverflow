import { HttpError } from '../types/SerializedError';

export class HttpException extends Error {
  constructor (
    public message = 'Error',
    public statusCode = 500, 
  ) {
    super(message);
  }

  serializeError (): HttpError {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}