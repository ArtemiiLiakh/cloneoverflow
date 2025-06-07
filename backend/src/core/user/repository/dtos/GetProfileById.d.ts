import { UserProfile } from '@core/user/UserProfile';

export type UserRepoGetProfileByIdInput = {
  userId: string,
}

export type UserRepoGetProfileByIdOutput = UserProfile;