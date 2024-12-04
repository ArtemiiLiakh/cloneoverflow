import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '@cloneoverflow/common';
import { Constructor } from '@common/utils/classTypes';

interface RequestFields<P, Q, B> {
  params?: Constructor<P>;
  query?: Constructor<Q>;
  body?: Constructor<B>;
}

export const validateRequest = <P, Q, B>(fiedls: RequestFields<P, Q, B>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const [key, type] of Object.entries(fiedls)) {
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