import { HttpException } from './HttpException';

export class AlreadyRegisteredException extends HttpException {
  constructor () {
    super('User with these credentials is already registered', 400);
  }
}