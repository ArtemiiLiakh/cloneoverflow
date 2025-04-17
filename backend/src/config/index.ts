import path from 'path';
import { cache } from './cache';
import { google } from './google';
import { jwt } from './jwt';
import { defaultPagination } from './pagination';

export default {
  SERVER_PORT: + (process.env.SERVER_PORT ?? 8000),
  POSTGRES_URL: process.env.POSTGRES_URL,
  REDIS_URL: process.env.REDIS_URL,
  SEED_EMAIL: process.env.SEED_EMAIL,
  defaultPagination,
  jwt,
  google,
  cache,
  ratingSystem: {
    filepath: path.join(process.cwd(), 'environment', 'ratings.json'),
  },
};