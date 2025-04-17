import { UserCreds } from '@core/models/user';

export type UserRepoGetCredsInput = {
  userId?: string,
  email?: string
}

export type UserRepoGetCredsOutput = UserCreds;