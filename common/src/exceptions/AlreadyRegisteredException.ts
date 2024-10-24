import { Exception } from './Exception';

export class AlreadyRegisteredException extends Exception {
  constructor () {
    super('User with these credentials is already registered', 400);
  }
}