import { Exception, ExceptionMessage } from '@cloneoverflow/common';
import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Exception, NotFoundException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch (exception: Exception | NotFoundException, host: ArgumentsHost): void {
    const req: Request = host.switchToHttp().getRequest();
    const res: Response = host.switchToHttp().getResponse();
    
    if (exception instanceof NotFoundException) {
      res
        .status(exception.getStatus())
        .send({
          path: req.url,
          status: exception.getStatus(),
          error: exception.constructor.name,
          message: exception.message,
          timestamp: new Date().toISOString(),
        } as ExceptionMessage);
      return;
    }

    const error = exception.serializeError();
    res
      .status(error.status)
      .send({
        path: req.url,
        status: error.status,
        error: exception.constructor.name,
        message: error.message,
        timestamp: new Date().toISOString(),
      } as ExceptionMessage);
  }
}