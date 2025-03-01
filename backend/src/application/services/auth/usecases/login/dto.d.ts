import { User } from '@core/models/User';

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