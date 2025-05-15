export class ExceptionMessage {
  message: string | string[];
  statusCode: number;
}

export class Exception extends Error {
  constructor (
    public message = 'Error',
    public statusCode = 500, 
  ) {
    super(message);
  }

  serializeError (): ExceptionMessage {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

