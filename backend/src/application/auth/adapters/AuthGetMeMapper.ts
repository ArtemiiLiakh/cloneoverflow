import { GetMeOutput } from '@application/auth/usecases/dtos';
import { GetMeResponse } from '@cloneoverflow/common/api/auth';

export function AuthGetMeMapperOutput (user: GetMeOutput): GetMeResponse {
  return {
    id: user.userId,
    name: user.name,
    username: user.username,
    rating: user.rating,
  };
}