import { User } from '@core/models/user';

export type GetMeInput = {
  executorId: string,
};

export type GetMeOutput = User;
