import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { ApplicationModule } from './app.module';
import { ValidationErrorFactory } from './factories/validationErrorFactory';
import { AllExceptionFilter } from './filters/all-exceptions.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';

export const initApplication = async (): Promise<INestApplication> => {
  const app = await NestFactory.create<NestExpressApplication>(
    ApplicationModule, 
    new ExpressAdapter(), 
    {
      cors: true,
      bodyParser: true,
    },
  );

  app.set('query parser', 'extended');
  app.use(cookieParser());

  const httpAdapter = app.get(HttpAdapterHost);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true,
    exceptionFactory: ValidationErrorFactory,
  }));
  
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter), new PrismaExceptionFilter(), new HttpExceptionFilter());

  return app;
};