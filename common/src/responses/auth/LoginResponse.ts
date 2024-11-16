import { UserStatusEnum } from '@enums/statuses/UserStatus';

export interface AuthLoginResponse {
  id: string;
  name: string;
  username: string;
  reputation: number;
  status: UserStatusEnum;
}