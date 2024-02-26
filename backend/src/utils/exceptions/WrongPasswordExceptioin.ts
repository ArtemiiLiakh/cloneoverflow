import { Exception } from './Exception'

export class WrongPasswordException extends Exception {
  message = 'Wrong password';
  statusCode = 403;
}