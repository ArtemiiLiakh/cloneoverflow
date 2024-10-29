import { Exception } from './Exception'

export class UnauthorizedException extends Exception {
  constructor (message = 'Unauthorized') {
    super(message, 401);
  }
}