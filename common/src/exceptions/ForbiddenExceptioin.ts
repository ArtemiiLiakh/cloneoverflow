import { Exception } from './Exception'

export class ForbiddenException extends Exception {
  constructor (message = 'Forbidden') {
    super(message, 403);
  }
}