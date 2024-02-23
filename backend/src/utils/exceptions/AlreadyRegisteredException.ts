import { Exception } from './Exception';

export class AlreadyRegisteredException extends Exception {
  message = 'User is already registered';
  statusCode = 400;
}