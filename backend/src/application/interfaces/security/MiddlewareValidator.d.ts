import { ExpressFunction } from '@application/adapters/types/ExpressFunction';

export interface MiddlewareValidator<T> {
  validate(arg: T): ExpressFunction;
}