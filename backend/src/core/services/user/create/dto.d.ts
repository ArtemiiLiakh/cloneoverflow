import { User } from '@core/models/User';

export type UserCreateInput = {
  email: string,
  password: string,
  name: string,
  username: string,
  about: string,
};

export type UserCreateOutput = User;
