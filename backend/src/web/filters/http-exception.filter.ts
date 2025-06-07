import { Exception, ExceptionMessage } from '@cloneoverflow/common';
import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Exception, NotFoundException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch (exception: Exception | NotFoundException, host: ArgumentsHost): void {
    const req: Request = host.switchToHttp().getRequest();
    const res: Response = host.switchToHttp().getResponse();
    
    
    if (exception instanceof Exception) {
      const body: ExceptionMessage = {
        path: req.url,
        status: exception.statusCode,
        error: exception.constructor.name,
        message: exception.message,
        timestamp: new Date().toISOString(),
      };

      res
        .status(exception.statusCode)
        .send(body);
      return;
    }
    res
      .status(exception.getStatus())
      .send({
        path: req.url,
        name: exception.constructor.name,
        status: exception.getStatus(),
        error: exception.constructor.name,
        message: exception.message,
        timestamp: new Date().toISOString(),
      } as ExceptionMessage);
    
  }
}