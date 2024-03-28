import { Exception } from './Exception';

export class AlreadyRegisteredException extends Exception {
  message = 'Email is already registered';
  statusCode = 400;
}