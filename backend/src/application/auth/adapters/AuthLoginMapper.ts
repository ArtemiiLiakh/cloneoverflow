import { LoginOutput } from '@application/auth/usecases/login/dto';
import { BasicLoginResponse } from '@cloneoverflow/common/api/auth';

export function AuthLoginMapperOutput (user: LoginOutput['user']): BasicLoginResponse {
  return {
    id: user.userId,
    name: user.name,
    username: user.username,
    rating: user.rating,
  };
}