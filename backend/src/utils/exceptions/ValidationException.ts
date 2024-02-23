import { ValidationError } from 'class-validator';
import { SerializedError } from '../types/SerializedError';
import { Exception } from './Exception';

export class ValidationException extends Exception {
  message: string[] = [];
  statusCode = 400;

  constructor (public errors: ValidationError[]) {
    super();
  }

  serializeError(): SerializedError {
    for (const error of this.errors) {
      const messages = Object.values(error.constraints ?? {});
      messages.forEach((message) => {
        this.message.push(`obj.${error.property}: ${message}`);
      });
    }

    return {
      message: this.message,
      statusCode: this.statusCode,
    }
  }
}