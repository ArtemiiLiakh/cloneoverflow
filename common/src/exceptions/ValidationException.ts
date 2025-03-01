import { ValidationError } from 'class-validator';
import { Exception, SerializedError } from './Exception';

export class ValidationException extends Exception {
  constructor (
    public errors: ValidationError[], 
    public field='body'
  ) {
    super(`obj.${field}: wrong value`, 400);
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
    const message = this.parseErrors(this.errors, `obj.${this.field}`);

    return {
      message,
      status: this.statusCode,
    }
  }
}