import { User } from '@core/domain/entities/User';

export type UserCreateInput = {
  email: string,
  password: string,
  name: string,
  username: string,
  about: string,
};

export type UserCreateOutput = User;
