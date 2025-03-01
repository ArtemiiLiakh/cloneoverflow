import { User } from '@core/models/User';

export type DeleteAccountInput = {
  executorId: string, 
  code: string,
  email: string,
  password: string,
};

export type DeleteAccountOutput = User;
