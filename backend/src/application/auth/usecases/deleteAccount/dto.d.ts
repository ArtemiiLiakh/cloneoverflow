import { User } from '@core/user/User';

export type DeleteAccountInput = {
  executorId: string, 
  code: string,
  email: string,
  password: string,
};

export type DeleteAccountOutput = User;
