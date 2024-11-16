import fs from 'fs';
import path from 'path';

interface GCredentials {
  app_password: string,
  app_email: string,
  refresh_token: string,
  client_id: string,
  client_secret: string,
  redirect_uri: string,
  scopes: string[],
}

let gCreds: GCredentials;

try {
  gCreds = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'credentials.json')).toString('utf-8'));
}
catch {
  gCreds = {
    app_email: process.env.GAPP_EMAIL,
    app_password: process.env.GAPP_PASSWORD,
    client_id: process.env.GREFRESH_TOKEN,
    client_secret: process.env.GCLIENT_ID,
    redirect_uri: process.env.GCLIENT_SECRET,
    refresh_token: process.env.GREDIRECT_URI,
    scopes: process.env.GSCOPES?.split(' '),
  } as GCredentials;
}

export default {
  SERVER_PORT: + (process.env.SERVER_PORT ?? 8000),
  POSTGRES_URL: process.env.POSTGRES_URL,
  REDIS_URL: process.env.REDIS_URL!,
  
  google: gCreds,
  cache: {
    CODE_EXPIRATION_TIME: 60,
    CODE_RETRIES: 5,
  },

  pagination: {
    defaultPageSize: 10,
    defaultPage: 0,
  },
  
  jwt: {
    TOKEN_SECRET: process.env.TOKEN_SECRET ?? 'secret',
    accessToken: {
      maxAge: 15 * 60,
    },
    refreshToken: {
      maxAge: 7 * 24 * 60 * 60,
    },
  },
};