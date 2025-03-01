import { GmailService } from '@infrastructure/email/GmailService';

export const EmailServiceDITokens = {
  Gmail: Symbol(GmailService.name),
};