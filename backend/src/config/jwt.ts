export const jwt = {
  TOKEN_SECRET: process.env.TOKEN_SECRET ?? 'secret',
  accessToken: {
    maxAge: 15 * 60,
  },
  refreshToken: {
    maxAge: 7 * 24 * 60 * 60,
  },
};