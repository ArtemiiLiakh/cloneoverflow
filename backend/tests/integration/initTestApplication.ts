import { ApplicationModule } from '@web/app.module';
import { EmailServiceDITokens } from '@web/di/tokens/EmailServiceDITokens';
import { ValidationErrorFactory } from '@web/factories/validationErrorFactory';
import { AllExceptionFilter } from '@web/filters/all-exceptions.filter';
import { HttpExceptionFilter } from '@web/filters/http-exception.filter';
import { PrismaExceptionFilter } from '@web/filters/prisma-exception.filter';
import { EmailService } from '@common/services/EmailService';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import cookieParser from 'cookie-parser';

export const initTestApplication = async (): Promise<NestExpressApplication> => {
  const emailService: EmailService = {
    sendEmail: async () => {},
  };
  
  const module = await Test.createTestingModule({
    imports: [ApplicationModule],
  })
    .overrideProvider(EmailServiceDITokens.Gmail)
    .useFactory({
      factory: () => emailService,
    })
    .compile();

  const app = module.createNestApplication<NestExpressApplication>();
  app.setGlobalPrefix('api');
  
  app.set('query parser', 'extended');
  app.use(cookieParser());
  
  const httpAdapter = app.get(HttpAdapterHost);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true,
    exceptionFactory: ValidationErrorFactory,
  }));
  
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter), new PrismaExceptionFilter(), new HttpExceptionFilter());

  await app.init();
  return app;
};