import { User } from '@core/models/user';

export type UserRepoUpdateInput = {
  userId: string,
  data: {
    name?: string,
    username?: string,
    about?: string,
  }
}

export type UserRepoUpdateOutput = User;