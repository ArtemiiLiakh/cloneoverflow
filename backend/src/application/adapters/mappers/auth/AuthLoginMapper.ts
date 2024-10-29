import { AuthServiceOutput } from "@app/auth/dto/AuthServiceOutput";
import { AuthLoginResponse } from "@cloneoverflow/common";

export function AuthLoginMapperOutput (user: AuthServiceOutput.Login["user"]): AuthLoginResponse {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    reputation: user.reputation,
    status: user.status,
  };
}