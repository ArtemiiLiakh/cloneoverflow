import { CreateAccountOutput } from '@application/services/auth/usecases/dtos';
import { AuthSignUpResponse } from '@cloneoverflow/common';

export function AuthCreateAccountMapperOutput (user: CreateAccountOutput['user']): AuthSignUpResponse {
  return {
    id: user.userId,
    name: user.name,
    username: user.username,
    reputation: user.rating,
    status: user.status,
  };
}