import { AuthServiceOutput } from "@app/auth/dto/AuthServiceOutput";
import { AuthSignUpResponse } from "@cloneoverflow/common";

export function AuthSingUpMapperOutput (user: AuthServiceOutput.SignUp["user"]): AuthSignUpResponse {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    reputation: user.reputation,
    status: user.status,
  };
}