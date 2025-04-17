import { User } from '@core/models/user';

export type UserRepoCreateInput = {
  creds: {
    email: string,
    password: string,
  },
  user: {
    name: string,
    username: string,
    about: string,
  }
}

export type UserRepoCreateOutput = User;