import { UserStatusEnum } from "../enums/statuses/UserStatus";

export class AuthGetMeResponse {
  id: string;
  name: string;
  username: string;
  reputation: number;
  status: UserStatusEnum;
}