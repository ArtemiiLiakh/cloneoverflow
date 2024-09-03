import { Exception } from "./Exception";

export class NoEntityWithIdException extends Exception {
  constructor(entity: string) {
    super();
    this.message = `${entity} id is invalid`
    this.statusCode = 404;
  }

  statusCode: number;
  message: string;
}
