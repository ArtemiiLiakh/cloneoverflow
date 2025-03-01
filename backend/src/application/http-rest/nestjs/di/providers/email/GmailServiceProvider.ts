import { GmailService } from '@infrastructure/email/GmailService';
import { Provider } from '@nestjs/common';
import { EmailServiceDITokens } from '../../tokens/EmailServiceDITokens';

export const GmailServiceProvider: Provider = {
  provide: EmailServiceDITokens.Gmail,
  useFactory: () => new GmailService(),
};