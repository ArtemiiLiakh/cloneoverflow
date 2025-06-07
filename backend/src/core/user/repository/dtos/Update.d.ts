import { User } from '@core/user';

export type UserRepoUpdateInput = {
  userId: string,
  data: {
    name?: string,
    username?: string,
    about?: string,
  }
}

export type UserRepoUpdateOutput = User;