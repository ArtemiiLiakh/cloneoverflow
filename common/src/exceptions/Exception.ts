export class Exception extends Error {
  constructor (
    public message = 'Error',
    public statusCode = 500, 
  ) {
    super(message);
  }

  serializeError (): string {
    return this.message;
  }
}

