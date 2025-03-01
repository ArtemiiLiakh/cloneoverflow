import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { ApplicationModule } from './app.module';
import { AllExceptionFilter } from './filters/all-exceptions.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';
import { DataValidationPipe } from './pipes/data-validation.pipe';

export const initApplication = async () => {
  const app = await NestFactory.create(ApplicationModule, {
    bodyParser: true,
    cors: true,
  });

  const httpAdapter = app.get(HttpAdapterHost);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new DataValidationPipe());
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter), new PrismaExceptionFilter(), new HttpExceptionFilter());

  return app;
};