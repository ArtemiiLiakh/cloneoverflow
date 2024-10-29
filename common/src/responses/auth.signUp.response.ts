import { UserStatusEnum } from "../enums";

export class AuthSignUpResponse {
  id: string;
  name: string;
  username: string;
  reputation: number;
  status: UserStatusEnum;
}