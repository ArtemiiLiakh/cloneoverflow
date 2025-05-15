import { cache } from './cache';
import { google } from './google';
import { jwt } from './jwt';
import { pagination } from './pagination';

export default {
  SERVER_PORT: + (process.env.SERVER_PORT ?? 8000),
  POSTGRES_URL: process.env.POSTGRES_URL,
  REDIS_URL: process.env.REDIS_URL,
  pagination,
  jwt,
  google,
  cache,
};