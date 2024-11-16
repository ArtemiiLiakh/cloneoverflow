import { UserStatusEnum } from '@enums/statuses/UserStatus';

export interface AuthSignUpResponse {
  id: string;
  name: string;
  username: string;
  reputation: number;
  status: UserStatusEnum;
}