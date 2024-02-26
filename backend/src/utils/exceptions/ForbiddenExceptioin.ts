import { Exception } from './Exception'

export class ForbiddenException extends Exception {
  message = 'Forbidden';
  statusCode = 403;
}