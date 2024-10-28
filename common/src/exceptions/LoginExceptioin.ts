import { HttpException } from './HttpException'

export class LoginException extends HttpException {
  constructor () {
    super('Wrong email or password', 400);
  }
}