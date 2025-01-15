import { ExpressRequest } from '@application/adapters/types/ExpressRequest';
import { ValidationException } from '@cloneoverflow/common';
import { Constructor } from '@common/utils/classTypes';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Response } from 'express';
import { FieldValidator } from '../../interfaces/security/FieldValidator';

interface RequestFields<P, Q, B> {
  params?: Constructor<P> | Record<string, FieldValidator>;
  query?: Constructor<Q> | Record<string, FieldValidator>;
  body?: Constructor<B> | Record<string, FieldValidator>;
}

export const validateRequest = <P, Q, B>(fields: RequestFields<P, Q, B>) => {
  return async (req: ExpressRequest, res: Response, next: NextFunction) => {
    for (const [key, validator] of Object.entries(fields)) {
      if (typeof validator === 'object') {
        for (const [fieldKey, type] of Object.entries<FieldValidator>(validator)) {
          if (!type.validate(req[key][fieldKey])) {
            const error = new ValidationError();

            error.property = fieldKey;
            error.value = req[key][fieldKey];
            error.target = req[key];
            error.constraints = {
              constraint: type.message,
            };

            throw new ValidationException([error], key);
          }
        }
      } 
      else {
        const data = plainToInstance(validator, req[key]);
        const errors = await validate(data);
        if (errors.length) {
          throw new ValidationException(errors, key);
        }

        req[key] = data;
      }
    }

    next();
  };
};