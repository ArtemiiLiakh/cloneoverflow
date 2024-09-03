import { Exception } from './Exception';

export class AlreadyRegisteredException extends Exception {
  message = 'User with these credentials is already registered';
  statusCode = 400;
}