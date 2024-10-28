import { HttpException } from "./HttpException";

export class RetriesExpiredException extends HttpException {
  constructor () {
    super('Amount of retries is expired', 403);
  }
}