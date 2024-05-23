import { CookieOptions } from 'express';

export default {
  SERVER_PORT: +(process.env.SERVER_PORT ?? 8000),
  TOKEN_SECRET: process.env.TOKEN_SECRET ?? 'secret',
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