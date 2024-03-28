import { NextFunction, Request, Response } from 'express'
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '@clone-overflow/common';

interface RequestFields {
  params?: new () => any;
  query?: new () => any;
  body?: new () => any;
}

export const validateRequest = (fiedls: RequestFields) => {
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
  }
}