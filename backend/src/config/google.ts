import { readFileSync } from 'fs';
import path from 'path';

interface GCredentials {
  app_password: string,
  app_email: string,
}

let google: GCredentials;

try {
  google = JSON.parse(readFileSync(path.join(process.cwd(), 'environment', 'credentials.json')).toString('utf-8'));
}
catch {
  google = {
    app_email: process.env.GAPP_EMAIL,
    app_password: process.env.GAPP_PASSWORD,
  } as GCredentials;
}

export { google };