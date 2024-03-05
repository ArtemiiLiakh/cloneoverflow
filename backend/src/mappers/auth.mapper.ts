import { GetMeResponse } from '../responses/auth.getMe.response';
import { DbUser } from '../types/database/DbUser';

export class AuthMapper {
  getMe ({ id, userProfile }: DbUser): GetMeResponse {
    return {
      id,
      name: userProfile.name,
      username: userProfile.username,
      reptutation: userProfile.reputation,
      status: userProfile.status,
    };
  }
}