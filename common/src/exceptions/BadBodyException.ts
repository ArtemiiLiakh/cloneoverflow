import { HttpException } from './HttpException';

export class BadBodyException extends HttpException {
  constructor (message = 'Bad body') {
    super(message, 400);
  }
}