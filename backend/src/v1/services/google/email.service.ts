import config from '@/v1/config';
import { OAuth2Client } from "google-auth-library/build/src/auth/oauth2client";
import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';

export class EmailService {
  private transporter: Transporter;

  constructor (auth: OAuth2Client) {
    this.transporter = nodemailer.createTransport({
      // @ts-ignore
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        type: 'OAuth2',
        user: config.google.app_email,
        accessToken: auth.credentials.access_token,
        refreshToken: auth.credentials.refresh_token,
        clientId: config.google.client_id,
        clientSecret: config.google.client_secret,
      },
    });

    this.transporter.on('token', (token) => {
      console.log('New google access token');
      auth.setCredentials({
        access_token: token.accessToken,
      });
    });

    auth.on('tokens', (tokens) => {
      console.log('Updated tokens from client');

      this.transporter = nodemailer.createTransport({
        // @ts-ignore
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          type: 'OAuth2',
          user: config.google.app_email,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          clientId: config.google.client_id,
          clientSecret: config.google.client_secret,
        },
      });
    });
  }

  sendEmail (email: string, mail: SendMailOptions) {
    return this.transporter.sendMail({
      from: {
        name: 'Test app',
        address: config.google.app_email,
      },
      to: email,
      ...mail,
    });
  }
}

