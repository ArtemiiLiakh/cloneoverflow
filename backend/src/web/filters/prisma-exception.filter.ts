import { ExceptionMessage } from '@cloneoverflow/common';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch (exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const req: Request = host.switchToHttp().getRequest();
    const res: Response = host.switchToHttp().getResponse();
    let message: string;
    let status: number;

    switch (exception.code) {
    case 'P2002': {
      const target = exception.meta?.target as string[];
      const modelName = exception.meta?.modelName as string;
      message = `${modelName} must have unique fields [${target.toString()}]`;
      status = 400;
      break;
    }
    default:
      message = 'Prisma error';
      status = 500;
    }

    res
      .status(status)
      .send({
        path: req.url,
        name: exception.name,
        status,
        error: exception.constructor.name,
        message,
        timestamp: new Date().toISOString(),
      } as ExceptionMessage);
  }
}