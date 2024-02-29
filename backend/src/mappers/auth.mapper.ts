import { MeResponse } from '../responses/me.response';
import { DbUser } from '../types/database/DbUser';

export class AuthMapper {
  getMe (user: DbUser): MeResponse {
    return {
      id: user.id,
      name: user.userProfile?.name,
      username: user.userProfile?.username,
      reptutation: user.userProfile?.reputation,
      status: user.userProfile?.status,
    };
  }
}