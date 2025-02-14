import { User } from '@core/domain/entities/User';

export type CreateAccountInput = {
  email: string;
  password: string;
  name: string;
  username: string;
  about: string;
};

export type CreateAccountOutput = {
  user: User,
  tokens: {
    access_token: string, 
    refresh_token: string,
  },
};