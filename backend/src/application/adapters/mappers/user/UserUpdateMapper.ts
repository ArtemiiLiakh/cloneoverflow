import { UserUpdateResponse } from "@cloneoverflow/common";
import { UserServiceOutput } from "@core/service/user/dto/UserServiceOutput";

export function UserUpdateMapperOutput (user: UserServiceOutput.Update): UserUpdateResponse {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    reputation: user.reputation,
    status: user.status,
    about: user.about,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
} 