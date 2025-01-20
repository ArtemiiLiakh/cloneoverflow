import { GetMeOutput } from '@application/auth/services/getMe/dto';
import { AuthGetMeResponse } from '@cloneoverflow/common';

export function AuthGetMeMapperOutput (user: GetMeOutput): AuthGetMeResponse {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    reputation: user.rating,
    status: user.status,
  };
}