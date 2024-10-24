import config from '@/config';
import { EmailProvider } from '@app/interfaces/email/EmailProvider';
import { createTransport, Transporter } from 'nodemailer';

export class GoogleEmailProvider implements EmailProvider {
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
      }
    });
  }

  async sendEmail(to: string, body: string): Promise<void> {
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