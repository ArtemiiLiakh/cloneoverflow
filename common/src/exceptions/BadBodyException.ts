import { Exception } from './Exception';

export class BadBodyException extends Exception {
  message: string;
  statusCode = 400;
}