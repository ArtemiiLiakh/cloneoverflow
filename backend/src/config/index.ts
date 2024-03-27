import envSchema from 'env-schema';
import { EnvSchemaData } from 'env-schema';
import path from 'path';
import { ConfigSchema } from './config.schema';
import { CookieOptions } from 'express';

const schema: EnvSchemaData = {
  type: 'object',
  required: ['TOKEN_SECRET', 'DATABASE_URL'],
  properties: {
    TOKEN_SECRET: {
      type: 'string',
    },
    DATABASE_URL: {
      type: 'string',
    },
  },
};

export default {
  ...envSchema<ConfigSchema>({
    schema,
    dotenv: {
      path: path.join(__dirname, '../../.env'),
    },
  }),
  accessTokenConfig: {
    httpOnly: false,
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000,
  } as CookieOptions,
  refreshTokenConfig: {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  } as CookieOptions,
}