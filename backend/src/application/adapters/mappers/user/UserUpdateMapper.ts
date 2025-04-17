import { UserUpdateResponse } from '@cloneoverflow/common';
import { UserUpdateOutput } from '@core/services/user/dtos';

export function UserUpdateMapperOutput (user: UserUpdateOutput): UserUpdateResponse {
  return {
    id: user.userId,
    name: user.name,
    username: user.username,
    rating: user.rating,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
} 