import { User } from '@core/domain/entities/User';

export type GetMeInput = {
  executorId: string,
};

export type GetMeOutput = User;
