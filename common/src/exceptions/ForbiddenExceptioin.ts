import { Exception } from './Exception'

export class ForbiddenException extends Exception {
  message: string;
  statusCode = 403;

  constructor (message = 'Forbidden') {
    super();
    this.message = message;
  }
}