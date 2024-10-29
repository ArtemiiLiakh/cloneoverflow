import { Exception } from "./Exception";

export class RetriesExpiredException extends Exception {
  constructor () {
    super('Amount of retries is expired', 403);
  }
}