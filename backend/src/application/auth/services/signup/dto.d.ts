import { User } from '@core/domain/entities/User';

export type SignUpInput = {
  email: string;
  password: string;
  name: string;
  username: string;
  about: string;
};

export type SignUpOutput = {
  user: User,
  tokens: {
    access_token: string, 
    refresh_token: string,
  },
};