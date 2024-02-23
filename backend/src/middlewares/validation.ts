import { NextFunction, Request, Response } from 'express'
import { plainToInstance } from 'class-transformer';
import { AuthLoginDTO } from '../dtos/auth.login.dto'
import { validate } from 'class-validator';
import { ValidationException } from '../utils/exceptions/ValidationException';

export const validateBody = (type: new () => any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const body = plainToInstance(type, req.body);
    const errors = await validate(body);

    if (errors.length) {
      throw new ValidationException(errors);
    }

    next();
  }
}