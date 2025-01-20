import { ExpressFunction } from '@application/adapters/types/ExpressFunction';
import { Validator } from '@common/utils/validator';

export interface MiddlewareValidator<T=unknown> extends Validator<T, ExpressFunction> {}