import { User } from '@core/models/user/User';

export type UserGetInput = {
  userId: string,
};

export type UserGetOutput = User;
