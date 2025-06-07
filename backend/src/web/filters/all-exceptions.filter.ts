import { ExceptionMessage } from '@cloneoverflow/common';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor (private httpAdapterHost: HttpAdapterHost) {}

  catch (exception: Error, host: ArgumentsHost): void {
    const req: Request = host.switchToHttp().getRequest();
    const res: Response = host.switchToHttp().getResponse();

    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    
    const body: ExceptionMessage = {
      path: req.url,
      status,
      error: exception.name,
      message: exception.message,
      timestamp: new Date().toISOString(),
    };

    if (status >= 500) {
      console.error(exception);
    }

    this.httpAdapterHost.httpAdapter.reply(res, body, status);
  }
}