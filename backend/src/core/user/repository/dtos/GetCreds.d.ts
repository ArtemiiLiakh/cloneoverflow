import { UserCreds } from '@core/user';

export type UserRepoGetCredsInput = {
  userId?: string,
  email?: string
}

export type UserRepoGetCredsOutput = UserCreds;