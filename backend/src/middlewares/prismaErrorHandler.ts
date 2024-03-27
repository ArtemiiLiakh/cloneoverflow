import { NextFunction, Request, Response } from 'express';
import { Exception } from '../utils/exceptions/Exception';
import { Prisma } from '@prisma/client';

export const prismaErrorHandler = (err: Prisma.PrismaClientKnownRequestError, req: Request, res: Response, next: NextFunction) => {
  if (!(err instanceof Prisma.PrismaClientKnownRequestError)) {
    next(err);
    return;
  }
  
  switch (err.code) {
    case 'P2002':
      const target = err.meta?.target as string[];
      const modelName = err.meta?.modelName as string;
      res.status(400).send({
        type: err.constructor.name,
        error: `${modelName} must have unique fields [${target}]`,
      });
      break;
    default:
      console.log('Prisma error');
      console.log(err);
      next(err);
  }
}