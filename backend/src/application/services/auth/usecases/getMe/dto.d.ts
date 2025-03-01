import { User } from '@core/models/User';

export type GetMeInput = {
  executorId: string,
};

export type GetMeOutput = User;
