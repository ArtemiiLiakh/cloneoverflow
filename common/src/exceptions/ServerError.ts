import { Exception } from './Exception';

export class ServerError extends Exception {
  constructor(message: string = 'ServerError') {
    super(message, 500);
  }
}