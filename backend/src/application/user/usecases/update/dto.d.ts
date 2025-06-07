import { User } from '@core/user/User';

export type UserUpdateInput = {
  executorId: string, 
  data: {
    name?: string,
    username?: string,
    about?: string,
  }
};

export type UserUpdateOutput = User;