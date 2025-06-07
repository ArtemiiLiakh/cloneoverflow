import { User } from '@core/user';

export type LoginInput = {
  email: string,
  password: string,
};

export type LoginOutput = {
  user: User,
  tokens: {
    access_token: string, 
    refresh_token: string,
  },
};