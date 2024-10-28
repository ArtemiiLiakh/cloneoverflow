import { HttpException } from "./HttpException";

export class NoEntityWithIdException extends HttpException {
  constructor(entity: string) {
    super(`${entity} id is invalid`, 404);
  }
}
