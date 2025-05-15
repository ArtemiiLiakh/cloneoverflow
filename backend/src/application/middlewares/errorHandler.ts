import { Exception, ExceptionResponse } from '@cloneoverflow/common';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response<ExceptionResponse>, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  let message: string | string[];
  let statusCode = 500;

  if (err instanceof Exception) {
    const error = err.serializeError();
    message = error.message;
    statusCode = error.statusCode;
  }
  else {
    message = 'Internal server error';
    console.log('Error on server');
    console.log(err);
  }

  res.status(statusCode).send({
    name: err.constructor.name,
    error: message,
  });
};