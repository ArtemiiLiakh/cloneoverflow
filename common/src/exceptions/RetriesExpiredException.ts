import { Exception } from "./Exception";

export class RetriesExpiredException extends Exception {
  statusCode = 403;
  message = 'Amount of retries is expired';
}