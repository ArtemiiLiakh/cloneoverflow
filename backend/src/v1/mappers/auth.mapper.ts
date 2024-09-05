import { GetMeResponse, UserStatus } from '@cloneoverflow/common';
import { DbUser } from '@/v1/types/database/DbUser';

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