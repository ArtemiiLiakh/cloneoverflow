import { Exception } from './Exception'

export class LoginException extends Exception {
  constructor () {
    super('Wrong email or password', 400);
  }
}