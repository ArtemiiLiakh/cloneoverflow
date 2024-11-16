import { UserStatusEnum } from "@enums/statuses/UserStatus";

export interface AuthGetMeResponse {
  id: string;
  name: string;
  username: string;
  reputation: number;
  status: UserStatusEnum;
}