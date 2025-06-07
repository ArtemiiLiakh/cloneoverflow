import { EmailService } from '@common/services/EmailService';
import config from '@/config';
import { createTransport, Transporter } from 'nodemailer';

export class GmailService implements EmailService {
  private transporter: Transporter;

  constructor () {
    this.transporter = createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        type: 'login',
        user: config.google.app_email,
        pass: config.google.app_password,
      },
    });
  }

  async sendEmail (to: string, body: string): Promise<void> {
    await this.transporter.sendMail({
      to,
      from: {
        name: 'Test app',
        address: config.google.app_email,
      },
      text: body,
    });
  }
}