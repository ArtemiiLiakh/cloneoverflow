import { GetMeResponse, UserStatus } from '@clone-overflow/common';
import { DbUser } from '../types/database/DbUser';

export class AuthMapper {
  getMe ({ id, userProfile }: DbUser): GetMeResponse {
    return {
      id,
      name: userProfile.name,
      username: userProfile.username,
      reputation: userProfile.reputation,
      status: userProfile.status as UserStatus,
    };
  }
}