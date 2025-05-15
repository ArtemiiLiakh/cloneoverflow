import { ExpressFunction } from '@application/adapters/types/ExpressFunction';
import { Validator } from '@common/services/Validator';

export interface MiddlewareValidator<T=unknown> extends Validator<T, ExpressFunction> {}