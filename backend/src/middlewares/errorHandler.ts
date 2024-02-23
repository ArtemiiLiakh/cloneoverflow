import { NextFunction, Request, Response } from 'express';
import { Exception } from '../utils/exceptions/Exception';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let message = err.message;
  let statusCode = 500;

  if (err instanceof Exception) {
    const error = err.serializeError();
    message = error.message;
    statusCode = error.statusCode;
  }

  res.status(statusCode).send({
    error: message,
  });
}