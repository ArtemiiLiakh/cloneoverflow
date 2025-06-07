import { Select } from '@common/repository/select';
import { User } from '@core/user';

export type UserRepoGetByIdInput = {
  userId: string,
  select?: Select<User>,
}

export type UserRepoGetByIdOutput = User;
