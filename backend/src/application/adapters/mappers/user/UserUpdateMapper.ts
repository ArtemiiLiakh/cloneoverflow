import { UserUpdateResponse } from '@cloneoverflow/common';
import { UserUpdateOutput } from '@core/services/user/update/dto';

export function UserUpdateMapperOutput (user: UserUpdateOutput): UserUpdateResponse {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    reputation: user.rating,
    status: user.status,
    about: user.about,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
} 