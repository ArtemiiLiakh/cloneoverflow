import { UserStatusEnum } from "../enums";

export class AuthLoginResponse {
  id: string;
  name: string;
  username: string;
  reputation: number;
  status: UserStatusEnum;
}