import { Select } from '@common/repository/select';
import { User } from '@core/models/user';

export type UserRepoGetByEmailInput = {
  email: string,
  select?: Select<User>,
}

export type UserRepoGetByEmailOutput = User;
