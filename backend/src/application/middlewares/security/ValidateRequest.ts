import { ExpressRequest } from '@application/adapters/types/ExpressRequest';
import { ValidationException } from '@cloneoverflow/common';
import { Constructor } from '@common/utils/classTypes';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Response } from 'express';

interface RequestFields<P, Q, B> {
  params?: Constructor<P>;
  query?: Constructor<Q>;
  body?: Constructor<B>;
}

export const validateRequest = <P, Q, B>(fields: RequestFields<P, Q, B>) => {
  return async (req: ExpressRequest, res: Response, next: NextFunction) => {
    for (const [key, type] of Object.entries(fields)) {
      const data = plainToInstance(type, req[key]);
      const errors = await validate(data);
      if (errors.length) {
        throw new ValidationException(errors, key);
      }
      req[key] = data;
    }

    next();
  };
};