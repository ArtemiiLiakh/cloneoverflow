import { User } from '@core/domain/entities/User';

export type DeleteAccountInput = {
  executorId: string, 
  code: string,
  email: string,
  password: string,
};

export type DeleteAccountOutput = User;
