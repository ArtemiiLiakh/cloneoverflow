import { ApplicationModule } from '@application/http-rest/nestjs/app.module';
import { EmailServiceDITokens } from '@application/http-rest/nestjs/di/tokens/EmailServiceDITokens';
import { HttpExceptionFilter } from '@application/http-rest/nestjs/filters/http-exception.filter';
import { DataValidationPipe } from '@application/http-rest/nestjs/pipes/data-validation.pipe';
import { EmailService } from '@application/interfaces/EmailService';
import { Test } from '@nestjs/testing';
import cookieParser from 'cookie-parser';

export const initTestApplication = async () => {
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

  const app = module.createNestApplication();
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(new DataValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.init();
  return app;
};