import { Exception } from "./Exception";

export class NoEntityWithIdException extends Exception {
  constructor(entity: string) {
    super(`${entity} id is invalid`, 404);
  }
}
