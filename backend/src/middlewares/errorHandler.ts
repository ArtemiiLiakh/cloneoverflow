import { NextFunction, Request, Response } from 'express';
import { Exception } from '../utils/exceptions/Exception';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let message = 'Internal server error';
  let statusCode = 500;

  if (err instanceof Exception) {
    const error = err.serializeError();
    message = error.message;
    statusCode = error.statusCode;
  }
  else {
    console.log('Error on server')
    console.log(err);
  }

  res.status(statusCode).send({
    type: err.constructor.name,
    error: message,
  });
}