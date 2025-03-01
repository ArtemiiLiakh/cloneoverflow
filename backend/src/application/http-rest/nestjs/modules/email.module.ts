import { Module } from '@nestjs/common';
import { GmailServiceProvider } from '../di/providers/email/GmailServiceProvider';

@Module({
  providers: [GmailServiceProvider],
  exports: [GmailServiceProvider],
})
export class EmailModule {}