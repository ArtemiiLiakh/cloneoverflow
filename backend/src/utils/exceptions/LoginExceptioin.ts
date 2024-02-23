import { Exception } from './Exception'

export class LoginException extends Exception {
  message = 'Wrong email or password';
  statusCode = 400;
}