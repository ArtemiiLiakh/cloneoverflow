import { basePath } from '@cloneoverflow/common/api';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
      bodyParser: true,
    },
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cloneoverflow API')
    .setVersion('1.0.0')
    .addServer('http://localhost:8000', 'Cloneoverflow api server')
    .build();

  SwaggerModule.setup('openapi', app, () => SwaggerModule.createDocument(app, swaggerConfig, {
    linkNameFactory: (_, methodKey) => methodKey,
    operationIdFactory: (_, methodKey) => methodKey,
  }), {
    jsonDocumentUrl: 'openapi/json',
    yamlDocumentUrl: 'openapi/yaml',
    explorer: true,
    raw: ['json', 'yaml'],
  });

  app.use(cookieParser());

  app.setGlobalPrefix(basePath);
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true,
    exceptionFactory: ValidationErrorFactory,
  }));
  
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter), new PrismaExceptionFilter(), new HttpExceptionFilter());

  return app;
};