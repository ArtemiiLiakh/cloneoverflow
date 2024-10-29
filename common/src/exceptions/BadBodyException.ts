import { Exception } from './Exception';

export class BadBodyException extends Exception {
  constructor (message = 'Bad body') {
    super(message, 400);
  }
}