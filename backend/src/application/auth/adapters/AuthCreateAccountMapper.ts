import { CreateAccountOutput } from '@application/auth/usecases/dtos';
import { CreateAccountResponse } from '@cloneoverflow/common/api/auth';

export function AuthCreateAccountMapperOutput (user: CreateAccountOutput['user']): CreateAccountResponse {
  return {
    id: user.userId,
  };
}