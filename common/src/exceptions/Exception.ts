export interface SerializedError {
  message: string | string[];
  status: number;
}

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
      status: this.statusCode,
    };
  }
}

