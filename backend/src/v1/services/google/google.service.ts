import config from "@/v1/config";
import { SingletonDecorator } from "@/v1/utils/decorators/SignletonDecorator";
import { OAuth2Client } from "google-auth-library/build/src/auth/oauth2client";
import { EmailService } from "./email.service";

@SingletonDecorator
export class GoogleService {
  private client: OAuth2Client;
  public email: EmailService;

  constructor () {
    this.client = new OAuth2Client({
      clientId: config.google.client_id,
      clientSecret: config.google.client_secret,
      redirectUri: config.google.redirect_uri,
      credentials: {
        refresh_token: config.google.refresh_token,
      },
    });

    this.email = new EmailService(this.client);
  }

  async updateRefreshToken (code: string) {
    const { tokens } = await this.client.getToken(code);
    this.client.setCredentials(tokens);
    return tokens;
  }

  getAuthURL () {
    return this.client.generateAuthUrl({
      scope: config.google.scopes,
      access_type: 'offline',
      prompt: 'consent'
    });
  }
}