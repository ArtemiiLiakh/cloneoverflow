import { Select } from '@common/repository/select';
import { User } from '@core/user';

export type UserRepoGetByUsernameInput = {
  username: string,
  select?: Select<User>,
}

export type UserRepoGetByUsernameOutput = User;

