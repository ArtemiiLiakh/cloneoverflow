import { User } from '@core/domain/entities/User';

export type UserGetInput = {
  userId: string,
};

export type UserGetOutput = User;
