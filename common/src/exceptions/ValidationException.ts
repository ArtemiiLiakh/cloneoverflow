import { ValidationError } from 'class-validator';
import { SerializedError } from '../types/SerializedError';
import { Exception } from './Exception';

export class ValidationException extends Exception {
  message: string[];
  statusCode = 400;

  constructor (public errors: ValidationError[], public field='body') {
    super();
  }

  private parseErrors(errors: ValidationError[], field: string) {
    let message: string[] = [];
    for (const error of errors) {
      if (error?.children?.length) {
        message = message.concat(this.parseErrors(error.children, `${field}.${error.property}`));
      }
      else {
        const messages = Object.values(error.constraints ?? {});
        messages.forEach((msg) => {
          message.push(`${field}.${error.property}: ${msg}`);
        });
      }
    }

    return message;
  }

  serializeError(): SerializedError {
    this.message = this.parseErrors(this.errors, `obj.${this.field}`);

    return {
      message: this.message,
      statusCode: this.statusCode,
    }
  }
}