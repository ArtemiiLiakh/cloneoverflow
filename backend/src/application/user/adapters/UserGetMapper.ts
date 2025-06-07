import { UserGetResponse } from '@cloneoverflow/common/api/user';
import { UserGetOutput } from '@application/user/usecases/dtos';

export function UserGetMapperOutput (user: UserGetOutput): UserGetResponse {
  return {
    id: user.userId,
    name: user.name,
    username: user.username,
    rating: user.rating,
    status: user.status,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
} 