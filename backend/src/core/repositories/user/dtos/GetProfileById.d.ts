import { UserProfile } from '@core/models/user/UserProfile';

export type UserRepoGetProfileByIdInput = {
  userId: string,
}

export type UserRepoGetProfileByIdOutput = UserProfile;