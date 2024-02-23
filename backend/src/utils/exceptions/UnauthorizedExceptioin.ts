import { Exception } from './Exception'

export class UnauthorizedException extends Exception {
  message = 'Unauthorized';
  statusCode = 401;
}