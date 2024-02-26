import envSchema from 'env-schema';
import { EnvSchemaData } from 'env-schema';
import path from 'path';
import { ConfigSchema } from './config.schema';

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

export default envSchema<ConfigSchema>({
  schema,
  dotenv: {
    path: path.join(__dirname, '../../.env'),
  },
});