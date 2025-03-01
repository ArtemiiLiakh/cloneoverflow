import { User } from '@core/models/User';

export type UserGetInput = {
  userId: string,
};

export type UserGetOutput = User;
